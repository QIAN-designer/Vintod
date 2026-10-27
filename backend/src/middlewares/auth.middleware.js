const AppError = require('../services/utils/appError');
const { verifyToken } = require('../utils/jwt.util');
const authRepo = require('../repos/auth.repo');

/**
 * Middleware de Autenticación JWT:
 * 1. Extrae token Bearer de Authorization
 * 2. Verifica vigencia y firma
 * 3. Valida contra DB que el usuario exista y tenga isActive: true
 * 4. Adjunta a req.user { id, role, email, profile }
 */
const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('No token provided. Authorization header required.', 401));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(new AppError('No token provided. Authorization header required.', 401));
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

    const user = await authRepo.findById(userId);

    if (!user) {
      return next(new AppError('User not found or no longer exists.', 401));
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

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateJWT,
};

