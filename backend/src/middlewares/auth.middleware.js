const AppError = require('../services/utils/appError');
const { verifyAccessToken } = require('../utils/jwt.util');
const usersRepo = require('../repos/users.repo');
const backlistRepo = require('../repos/backlist.repo');

const ACCESS_COOKIE_NAME = 'access_token';
const COOKIE_ACCESS_NAME = 'cookie_access';
const LEGACY_COOKIE_NAME = 'jwt_token';

/**
 * Middleware de Autenticación JWT:
 * 1. Extrae access token prioritariamente desde Cookies httpOnly:
 *    - req.cookie_access (si existe propiedad directa)
 *    - req.cookies.cookie_access / req.cookies.access_token / req.cookies.jwt_token
 *    - o desde Header Bearer (Authorization) como fallback
 * 2. Si falta el token, lanza error 401
 * 3. Comprueba si el token se encuentra en la tabla `backlist` (revocado) -> 401
 * 4. Verifica vigencia y firma criptográfica -> 401 si expiró o es inválido
 * 5. Valida contra DB que el usuario exista, no esté eliminado y esté activo -> 401
 * 6. Adjunta a req.user { id, role, email, profile } y req.token
 */
const authenticateJWT = async (req, res, next) => {
  try {
    let token = null;

    // 1. Extraer desde req.cookie_access directo o cookies httpOnly
    if (req.cookie_access) {
      token = req.cookie_access;
    } else if (req.cookies) {
      token =
        req.cookies[COOKIE_ACCESS_NAME] ||
        req.cookies[ACCESS_COOKIE_NAME] ||
        req.cookies['cookie_acces'] ||
        req.cookies[LEGACY_COOKIE_NAME];
    }

    // 2. Fallback: Cabecera Authorization: Bearer <token>
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Si no hay token de acceso proporcionado, lanzar error 401 Unauthorized
    if (!token) {
      return next(new AppError('No autorizado: Token de acceso no proporcionado (cookie o header requerido)', 401));
    }

    // Comprobar si el token ha sido revocado en la tabla backlist
    const isRevoked = await backlistRepo.isTokenInBacklist(token);
    if (isRevoked) {
      return next(new AppError('Token revocado. Por favor, inicia sesión nuevamente.', 401));
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(new AppError('Token de acceso expirado. Por favor renueva tu sesión.', 401));
      }
      return next(new AppError('Token de acceso inválido.', 401));
    }

    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return next(new AppError('Carga del token inválida.', 401));
    }

    const user = await usersRepo.findById(userId);

    if (!user) {
      return next(new AppError('Usuario no encontrado o no existe.', 401));
    }

    if (user.deletedAt) {
      return next(new AppError('La cuenta ha sido eliminada o dada de baja.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('La cuenta está suspendida o inactiva.', 401));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role ? user.role.name : 'USER',
      roleId: user.roleId,
      profile: user.profile,
    };
    req.token = token;

    next();
  } catch (error) {
    next(new AppError(error.message || 'Error de autenticación.', 401));
  }
};

module.exports = {
  authenticateJWT,
};
