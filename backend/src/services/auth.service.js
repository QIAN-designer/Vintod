const AppError = require('./utils/appError');
const { hashPassword, verifyPassword } = require('../utils/password.util');
const { generateToken, decodeToken } = require('../utils/jwt.util');
const authRepo = require('../repos/auth.repo');
const profilesRepo = require('../repos/profiles.repo');
const backlistRepo = require('../repos/backlist.repo');

/**
 * Registra un nuevo usuario creando atómicamente User + Profile
 */
const register = async (userData) => {
  const { email, password, username, ...profileDetails } = userData;

  // 1. Validar que el email no esté en uso
  const existingEmail = await authRepo.findByEmail(email);
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
  let userRole = await authRepo.findRoleByName('USER');
  if (!userRole) {
    userRole = await authRepo.ensureRole('USER', 'Usuario comprador/vendedor del marketplace');
  }

  // 5. Crear de forma atómica User + Profile
  const newUser = await authRepo.createUserWithProfile({
    email,
    password: hashedPassword,
    roleId: userRole.id,
    profileData: {
      username,
      ...profileDetails,
    },
  });

  // 6. Generar JWT firmado
  const token = generateToken({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role ? newUser.role.name : 'USER',
  });

  return {
    user: newUser,
    token,
  };
};

/**
 * Autentica usuario por email y password
 */
const login = async ({ email, password }) => {
  // 1. Buscar usuario con su password hasheado
  const user = await authRepo.findByEmailWithPassword(email);

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  // 2. Verificar estado de la cuenta
  if (!user.isActive) {
    throw new AppError('Tu cuenta está desactivada o suspendida. Contacta con soporte.', 403);
  }

  // 3. Verificar contraseña con Argon2
  const isMatch = await verifyPassword(user.password, password);
  if (!isMatch) {
    throw new AppError('Credenciales inválidas', 401);
  }

  // 4. Generar JWT
  const roleName = user.role ? user.role.name : 'USER';
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: roleName,
  });

  // 5. Devolver datos excluyendo explícitamente el campo password
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

/**
 * Obtiene los datos del usuario actual autenticado
 */
const getMe = async (userId) => {
  const user = await authRepo.findById(userId);
  if (!user) {
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

  // Extraer fecha de expiración si es posible para guardarla en la backlist
  let expiresAt = null;
  try {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
      expiresAt = new Date(decoded.exp * 1000);
    }
  } catch (e) {
    // Si no se puede decodificar, expira de inmediato o null
  }

  return await backlistRepo.addToBacklist({
    token,
    userId,
    expiresAt,
  });
};

/**
 * Realiza el logout de un usuario revocando su token mediante revoke_token
 * @param {string} token - Token JWT actual
 * @param {string|null} userId - ID del usuario autenticado
 */
const logout = async (token, userId = null) => {
  await revoke_token(token, userId);
  return {
    message: 'Sesión cerrada exitosamente. Token revocado.',
  };
};

module.exports = {
  register,
  login,
  getMe,
  revoke_token,
  logout,
};
