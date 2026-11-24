const { prisma } = require('../config/db');
const { mapProduct, productInclude } = require('./products.repo');

const findLike = async (userId, productId) => {
  return await prisma.like.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

const createLike = async (userId, productId) => {
  return await prisma.like.create({
    data: {
      userId,
      productId,
    },
  });
};

const deleteLike = async (userId, productId) => {
  return await prisma.like.deleteMany({
    where: {
      userId,
      productId,
    },
  });
};

const countByProduct = async (productId) => {
  return await prisma.like.count({
    where: { productId },
  });
};

const findProductById = async (productId) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
      isActive: true,
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    },
    select: {
      id: true,
      title: true,
    },
  });
};

const findLikedProductsByUser = async (userId) => {
  const likes = await prisma.like.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      product: {
        include: productInclude,
      },
    },
  });

  return likes
    .filter((entry) => entry.product && entry.product.isActive && !entry.product.deletedAt)
    .map((entry) => ({
      ...mapProduct(entry.product),
      likedAt: entry.createdAt,
    }));
};

module.exports = {
  findLike,
  createLike,
  deleteLike,
  countByProduct,
  findProductById,
  findLikedProductsByUser,
};
