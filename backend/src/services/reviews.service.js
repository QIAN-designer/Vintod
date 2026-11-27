const AppError = require('./utils/appError');
const reviewsRepo = require('../repos/reviews.repo');

const formatReview = (review) => ({
  id: review.id,
  rating: review.rating,
  comment: review.comment || '',
  createdAt: review.createdAt,
  updatedAt: review.updatedAt,
  author: {
    id: review.author?.id || review.authorId,
    username:
      review.author?.profile?.username ||
      review.author?.email?.split('@')[0] ||
      'usuario',
    avatarUrl: review.author?.profile?.avatarUrl || null,
    city: review.author?.profile?.city || null,
  },
});

const computeStats = (reviews) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let total = 0;

  for (const r of reviews) {
    total += r.rating;
    if (distribution[r.rating] !== undefined) {
      distribution[r.rating] += 1;
    }
  }

  const ratingCount = reviews.length;
  const ratingAverage =
    ratingCount > 0 ? Number((total / ratingCount).toFixed(1)) : 0;

  return {
    ratingAverage,
    ratingCount,
    distribution,
  };
};

/**
 * Obtiene las valoraciones recibidas por un usuario y calcula su media real
 */
const getUserReviews = async (targetUserId) => {
  const rawReviews = await reviewsRepo.findReceivedByUserId(targetUserId);
  const stats = computeStats(rawReviews);

  return {
    targetUserId,
    ...stats,
    reviews: rawReviews.map(formatReview),
  };
};

/**
 * Crea una valoración con comentario de authorId hacia targetUserId y recalcula la media en Profile
 */
const createReview = async (authorId, targetUserId, { rating, comment }) => {
  if (!authorId) {
    throw new AppError('Debes iniciar sesión para publicar una valoración o comentario.', 401);
  }

  if (authorId === targetUserId) {
    throw new AppError('No puedes valorarte a ti mismo.', 400);
  }

  const targetUser = await reviewsRepo.findTargetUserById(targetUserId);
  if (!targetUser) {
    throw new AppError('Usuario a valorar no encontrado.', 404);
  }

  const existing = await reviewsRepo.findByAuthorAndTarget(authorId, targetUserId);
  if (existing) {
    throw new AppError('Ya has valorado a este usuario anteriormente.', 409);
  }

  let created;
  try {
    created = await reviewsRepo.createReview({
      authorId,
      targetUserId,
      rating,
      comment,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new AppError('Ya has valorado a este usuario anteriormente.', 409);
    }
    throw error;
  }

  const stats = await reviewsRepo.syncProfileRatingStats(targetUserId);

  return {
    review: formatReview(created),
    ...stats,
  };
};

/**
 * Control de errores: las valoraciones y comentarios no se pueden eliminar una vez publicados
 */
const deleteReview = async () => {
  throw new AppError(
    'No está permitido eliminar valoraciones ni comentarios una vez publicados.',
    403
  );
};

module.exports = {
  getUserReviews,
  createReview,
  deleteReview,
};
