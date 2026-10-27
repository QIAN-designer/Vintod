const AppError = require('../services/utils/appError');

/**
 * Middleware RBAC (Role-Based Access Control)
 * @param  {...string} allowedRoles - Lista de nombres de roles permitidos (ej: 'ADMIN', 'USER')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized: Authentication required.', 401));
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return next(
        new AppError(
          `Forbidden: You do not have permission to perform this action. Required role: ${allowedRoles.join(' or ')}.`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  authorizeRoles,
};

