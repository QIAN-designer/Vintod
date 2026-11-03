const AppError = require('../services/utils/appError');
const { verifyToken } = require('../utils/jwt.util');
const usersRepo = require('../repos/users.repo');
const backlistRepo = require('../repos/backlist.repo');

const COOKIE_NAME = 'jwt_token';

/**
 * Middleware de Autenticación JWT:
 * 1. Extrae token desde Cookies httpOnly (req.cookies.jwt_token) o desde el Header Bearer (Authorization)
 * 2. Comprueba si el token se encuentra en la tabla `backlist` (revocado)
 * 3. Verifica vigencia y firma criptográfica
 * 4. Valida contra DB que el usuario exista, no esté eliminado lógicamente (deletedAt === null) y tenga isActive: true
 * 5. Adjunta a req.user { id, role, email, profile } y req.token
 */
const authenticateJWT = async (req, res, next) => {
  try {
    let token = null;

    // 1. Prioridad: Leer token de la cookie httpOnly
    if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    // 2. Fallback: Leer token desde cabecera Authorization: Bearer <token>
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No token provided. Authorization header or cookie required.', 401));
    }

    // Comprobar si el token ha sido revocado en la tabla backlist
    const isRevoked = await backlistRepo.isTokenInBacklist(token);
    if (isRevoked) {
      return next(new AppError('Token revocado. Por favor, inicia sesión nuevamente.', 401));
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next(new AppError('Token expired. Please login again.', 401));
      }
      return next(new AppError('Invalid authentication token.', 401));
    }

    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return next(new AppError('Invalid token payload.', 401));
    }

    const user = await usersRepo.findById(userId);

    if (!user) {
      return next(new AppError('User not found or no longer exists.', 401));
    }

    if (user.deletedAt) {
      return next(new AppError('Account has been deleted or deactivated.', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Account is suspended or deactivated.', 401));
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
    next(error);
  }
};

module.exports = {
  authenticateJWT,
};
