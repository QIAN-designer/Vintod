const AppError = require('../services/utils/appError');
const { prisma } = require('../config/db');

/**
 * Helper ABAC: Comprueba si el usuario autenticado es el propietario del recurso
 */
const isOwner = (userId, resourceOwnerId) => {
  return String(userId) === String(resourceOwnerId);
};

/**
 * Helper ABAC: Comprueba si el usuario es propietario o tiene rol ADMIN
 */
const isOwnerOrAdmin = (user, resourceOwnerId) => {
  if (!user) return false;
  if (user.role === 'ADMIN') return true;
  return isOwner(user.id, resourceOwnerId);
};

/**
 * Helper ABAC: Comprueba si un usuario puede modificar un producto dado
 */
const canModifyProduct = (user, product) => {
  if (!user || !product) return false;
  if (user.role === 'ADMIN') return true;
  return isOwner(user.id, product.sellerId);
};

/**
 * Middleware ABAC para modificación/eliminación de perfil
 * Permite la acción si el usuario autenticado es el dueño del perfil o es ADMIN
 */
const authorizeProfileModification = (req, res, next) => {
  const targetUserId = req.params.userId || req.params.id;

  if (!targetUserId) {
    return next(new AppError('User ID parameter is required.', 400));
  }

  if (!isOwnerOrAdmin(req.user, targetUserId)) {
    return next(
      new AppError(
        'Forbidden: You are only allowed to manage your own profile.',
        403
      )
    );
  }

  next();
};

/**
 * Middleware ABAC para modificación/eliminación de productos
 * Permite la acción si el usuario autenticado es el vendedor del producto o es ADMIN
 */
const authorizeProductModification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true, sellerId: true, isActive: true },
    });

    if (!product) {
      return next(new AppError('Product not found.', 404));
    }

    if (!canModifyProduct(req.user, product)) {
      return next(
        new AppError(
          'Forbidden: You can only edit or delete your own items for sale.',
          403
        )
      );
    }

    req.targetProduct = product;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isOwner,
  isOwnerOrAdmin,
  canModifyProduct,
  authorizeProfileModification,
  authorizeProductModification,
};

