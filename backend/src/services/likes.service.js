const AppError = require('./utils/appError');
const likesRepo = require('../repos/likes.repo');

/**
 * Obtiene el contador de likes de un producto y si el usuario actual le ha dado like
 */
const getProductLikes = async (productId, userId = null) => {
  const product = await likesRepo.findProductById(productId);
  if (!product) {
    throw new AppError('Producto no encontrado o no disponible', 404);
  }

  const [likesCount, existingLike] = await Promise.all([
    likesRepo.countByProduct(productId),
    userId ? likesRepo.findLike(userId, productId) : Promise.resolve(null),
  ]);

  return {
    productId,
    likesCount,
    likedByMe: Boolean(existingLike),
  };
};

/**
 * Registra un like de un usuario a un producto.
 * Control de errores: impide dar like dos veces al mismo producto (HTTP 409 Conflict).
 */
const addLike = async (userId, productId) => {
  const product = await likesRepo.findProductById(productId);
  if (!product) {
    throw new AppError('Producto no encontrado o no disponible', 404);
  }

  // Verificación previa para devolver un error explícito si ya existe el like
  const existingLike = await likesRepo.findLike(userId, productId);
  if (existingLike) {
    throw new AppError('Ya has dado like a este producto. No puedes dar like dos veces.', 409);
  }

  let like;
  try {
    like = await likesRepo.createLike(userId, productId);
  } catch (error) {
    // Protección adicional ante condiciones de carrera usando @@unique([userId, productId])
    if (error.code === 'P2002') {
      throw new AppError('Ya has dado like a este producto. No puedes dar like dos veces.', 409);
    }
    throw error;
  }

  const likesCount = await likesRepo.countByProduct(productId);

  return {
    like,
    productId,
    likesCount,
    likedByMe: true,
  };
};

/**
 * Elimina el like de un usuario a un producto
 */
const removeLike = async (userId, productId) => {
  const product = await likesRepo.findProductById(productId);
  if (!product) {
    throw new AppError('Producto no encontrado o no disponible', 404);
  }

  const existingLike = await likesRepo.findLike(userId, productId);
  if (!existingLike) {
    throw new AppError('No habías dado like a este producto.', 404);
  }

  await likesRepo.deleteLike(userId, productId);
  const likesCount = await likesRepo.countByProduct(productId);

  return {
    productId,
    likesCount,
    likedByMe: false,
  };
};

/**
 * Obtiene la lista de productos a los que el usuario actual ha dado like
 */
const getMyLikedProducts = async (userId) => {
  return await likesRepo.findLikedProductsByUser(userId);
};

module.exports = {
  getProductLikes,
  addLike,
  removeLike,
  getMyLikedProducts,
};
