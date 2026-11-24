const AppError = require('./utils/appError');
const { hashPassword, verifyPassword } = require('../utils/password.util');
const {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  decodeToken,
  getTokenExpirationDate,
} = require('../utils/jwt.util');
const usersRepo = require('../repos/users.repo');
const profilesRepo = require('../repos/profiles.repo');
const backlistRepo = require('../repos/backlist.repo');
const refreshTokenRepo = require('../repos/refreshToken.repo');

/**
 * Registra un nuevo usuario creando atómicamente User + Profile
 */
const register = async (userData) => {
  const { email, password, username, ...profileDetails } = userData;

  // 1. Validar que el email no esté en uso
  const existingEmail = await usersRepo.findByEmail(email);
  if (existingEmail) {
    throw new AppError('El correo electrónico ya está registrado', 400);
  }

  // 2. Validar que el username no esté en uso
  const existingUsername = await profilesRepo.findByUsername(username);
  if (existingUsername) {
    throw new AppError('El nombre de usuario ya está en uso', 400);
  }

  // 3. Hashear password con Argon2
  const hashedPassword = await hashPassword(password);

  // 4. Obtener o crear rol USER por defecto
  let userRole = await usersRepo.findRoleByName('USER');
  if (!userRole) {
    userRole = await usersRepo.ensureRole('USER', 'Usuario comprador/vendedor del marketplace');
  }

  // 5. Crear de forma atómica User + Profile
  const newUser = await usersRepo.createUserWithProfile({
    email,
    password: hashedPassword,
    roleId: userRole.id,
    profileData: {
      username,
      ...profileDetails,
    },
  });

  const payload = {
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role ? newUser.role.name : 'USER',
  };

  // 6. Generar Access Token y Refresh Token
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ userId: newUser.id });

  // 7. Guardar Refresh Token en la BBDD
  const expiresAt = getTokenExpirationDate(refreshToken, 7);
  await refreshTokenRepo.createRefreshToken({
    token: refreshToken,
    userId: newUser.id,
    expiresAt,
  });

  return {
    user: newUser,
    token: accessToken,
    accessToken,
    refreshToken,
  };
};

/**
 * Autentica usuario por email y password
 */
const login = async ({ email, password }) => {
  // 1. Buscar usuario con su password hasheado
  const user = await usersRepo.findByEmailWithPassword(email);

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  // 2. Verificar soft delete (deletedAt)
  if (user.deletedAt) {
    throw new AppError('Esta cuenta ha sido eliminada o dada de baja.', 403);
  }

  // 3. Verificar estado de la cuenta
  if (!user.isActive) {
    throw new AppError('Tu cuenta está desactivada o suspendida. Contacta con soporte.', 403);
  }

  // 4. Verificar contraseña con Argon2
  const isMatch = await verifyPassword(user.password, password);
  if (!isMatch) {
    throw new AppError('Credenciales inválidas', 401);
  }

  // 5. Generar Access Token y Refresh Token
  const roleName = user.role ? user.role.name : 'USER';
  const payload = {
    userId: user.id,
    email: user.email,
    role: roleName,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ userId: user.id });

  // 6. Guardar Refresh Token en la BBDD
  const expiresAt = getTokenExpirationDate(refreshToken, 7);
  await refreshTokenRepo.createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt,
  });

  // 7. Devolver datos excluyendo explícitamente el campo password
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: accessToken,
    accessToken,
    refreshToken,
  };
};

/**
 * Renueva el access_token a partir de un refresh_token válido en cookie/body y BBDD
 */
const refreshSession = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw new AppError('Refresh token no proporcionado', 401);
  }

  // 1. Verificar firma y vigencia del refresh token
  let decoded;
  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch (err) {
    // Si caducó o es inválido, eliminarlo de la BBDD si existía
    await refreshTokenRepo.deleteRefreshToken(oldRefreshToken);
    throw new AppError('Refresh token inválido o expirado', 401);
  }

  // 2. Verificar en la BBDD que exista, no esté revocado y no haya expirado
  const storedToken = await refreshTokenRepo.findValidRefreshToken(oldRefreshToken);
  if (!storedToken || !storedToken.user) {
    await refreshTokenRepo.deleteRefreshToken(oldRefreshToken);
    throw new AppError('Refresh token revocado, no encontrado o usuario inexistente', 401);
  }

  const user = storedToken.user;
  if (!user.isActive || user.deletedAt) {
    await refreshTokenRepo.deleteAllUserTokens(user.id);
    throw new AppError('Usuario inactivo o suspendido', 403);
  }

  // 3. Eliminar el refresh token anterior de la BBDD (rotación de tokens)
  await refreshTokenRepo.deleteRefreshToken(oldRefreshToken);

  // 4. Generar nuevo Access Token y nuevo Refresh Token
  const roleName = user.role ? user.role.name : 'USER';
  const payload = {
    userId: user.id,
    email: user.email,
    role: roleName,
  };

  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken({ userId: user.id });

  // 5. Guardar nuevo Refresh Token en la BBDD
  const expiresAt = getTokenExpirationDate(newRefreshToken, 7);
  await refreshTokenRepo.createRefreshToken({
    token: newRefreshToken,
    userId: user.id,
    expiresAt,
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: newAccessToken,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Obtiene los datos del usuario actual autenticado
 */
const getMe = async (userId) => {
  const user = await usersRepo.findById(userId);
  if (!user || user.deletedAt) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return user;
};

/**
 * Revoca un token añadiéndolo a la tabla backlist
 * @param {string} token - Token JWT a revocar
 * @param {string|null} userId - ID del usuario asociado (opcional)
 */
const revoke_token = async (token, userId = null) => {
  if (!token) {
    throw new AppError('Token no proporcionado para revocar', 400);
  }

  let expiresAt = null;
  try {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
      expiresAt = new Date(decoded.exp * 1000);
    }
  } catch (e) {}

  return await backlistRepo.addToBacklist({
    token,
    userId,
    expiresAt,
  });
};

/**
 * Realiza el logout de un usuario:
 * - Limpia tokens expirados de backlist y refresh_tokens
 * - Si el access_token aún no ha expirado, lo añade a backlist para impedir su reutilización
 * - Elimina físicamente el refresh_token (y los del usuario) de refresh_tokens en la BBDD
 */
const logout = async ({ accessToken, refreshToken, userId = null }) => {
  // Resolver userId desde los tokens si no vino en req.user (incluso si están caducados)
  let resolvedUserId = userId;
  if (!resolvedUserId && accessToken) {
    const decodedAccess = decodeToken(accessToken);
    resolvedUserId = decodedAccess?.userId || decodedAccess?.id || null;
  }
  if (!resolvedUserId && refreshToken) {
    const decodedRefresh = decodeToken(refreshToken);
    resolvedUserId = decodedRefresh?.userId || decodedRefresh?.id || null;
  }

  // Limpiar tokens caducados acumulados en backlist y refresh_tokens
  await Promise.all([
    backlistRepo.cleanExpiredTokens(),
    refreshTokenRepo.cleanExpiredTokens(),
  ]);

  // Revocar access_token en backlist solo si aún no ha expirado
  if (accessToken) {
    const decodedAccess = decodeToken(accessToken);
    const expiresAt = decodedAccess?.exp ? new Date(decodedAccess.exp * 1000) : null;
    if (!expiresAt || expiresAt > new Date()) {
      await revoke_token(accessToken, resolvedUserId);
    }
  }

  // Eliminar físicamente el/los refresh token(s) de la BBDD
  if (refreshToken) {
    await refreshTokenRepo.deleteRefreshToken(refreshToken);
  }
  if (resolvedUserId) {
    await refreshTokenRepo.deleteAllUserTokens(resolvedUserId);
  }

  return {
    message: 'Sesión cerrada exitosamente. Tokens eliminados de la BBDD.',
  };
};

module.exports = {
  register,
  login,
  refreshSession,
  getMe,
  revoke_token,
  logout,
};
