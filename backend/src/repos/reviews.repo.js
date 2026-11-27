const { prisma } = require('../config/db');

const findReceivedByUserId = async (targetUserId) => {
  return await prisma.review.findMany({
    where: { targetUserId },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
              city: true,
            },
          },
        },
      },
    },
  });
};

const findByAuthorAndTarget = async (authorId, targetUserId) => {
  return await prisma.review.findUnique({
    where: {
      authorId_targetUserId: {
        authorId,
        targetUserId,
      },
    },
  });
};

const findById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
  });
};

const createReview = async ({ authorId, targetUserId, rating, comment }) => {
  return await prisma.review.create({
    data: {
      authorId,
      targetUserId,
      rating,
      comment,
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              username: true,
              avatarUrl: true,
              city: true,
            },
          },
        },
      },
    },
  });
};

const findTargetUserById = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
      isActive: true,
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    },
    select: { id: true },
  });
};

const syncProfileRatingStats = async (targetUserId) => {
  const reviews = await prisma.review.findMany({
    where: { targetUserId },
    select: { rating: true },
  });

  const ratingCount = reviews.length;
  const ratingAverage =
    ratingCount > 0
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount).toFixed(2))
      : 0;

  await prisma.profile.updateMany({
    where: { userId: targetUserId },
    data: {
      ratingAverage,
      ratingCount,
    },
  });

  return { ratingAverage, ratingCount };
};

module.exports = {
  findReceivedByUserId,
  findByAuthorAndTarget,
  findById,
  createReview,
  findTargetUserById,
  syncProfileRatingStats,
};
