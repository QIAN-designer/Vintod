const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../ctrls/reviews.ctrl');
const validate = require('../middlewares/validate.middleware');
const {
  userIdParamSchema,
  reviewIdParamSchema,
  createReviewSchema,
} = require('../schemas/reviews.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');

// Valoraciones recibidas por el usuario autenticado + media calculada
router.get('/me', authenticateJWT, reviewsCtrl.getMyReviews);

// Valoraciones recibidas por un usuario concreto (público)
router.get(
  '/user/:userId',
  validate({ params: userIdParamSchema }),
  reviewsCtrl.getUserReviews
);

// Crear valoración para otro usuario (requiere autenticación)
router.post(
  '/user/:userId',
  authenticateJWT,
  validate({ params: userIdParamSchema, body: createReviewSchema }),
  reviewsCtrl.createReview
);

// Eliminar valoración propia (o ADMIN)
router.delete(
  '/:reviewId',
  authenticateJWT,
  validate({ params: reviewIdParamSchema }),
  reviewsCtrl.deleteReview
);

module.exports = router;
