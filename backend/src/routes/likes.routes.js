const express = require('express');
const router = express.Router();

const likesCtrl = require('../ctrls/likes.ctrl');
const validate = require('../middlewares/validate.middleware');
const { productIdParamSchema } = require('../schemas/likes.schemas');
const { authenticateJWT, optionalAuthenticateJWT } = require('../middlewares/auth.middleware');

// Obtener las prendas favoritas (likes) del usuario autenticado
router.get('/me', authenticateJWT, likesCtrl.getMyLikes);

// Obtener total de likes y si el usuario actual dio like (público, con auth opcional)
router.get(
  '/product/:productId',
  optionalAuthenticateJWT,
  validate({ params: productIdParamSchema }),
  likesCtrl.getProductLikes
);

// Dar like a un producto (requiere autenticación; bloquea doble like con 409)
router.post(
  '/product/:productId',
  authenticateJWT,
  validate({ params: productIdParamSchema }),
  likesCtrl.addLike
);

// Quitar like de un producto (requiere autenticación)
router.delete(
  '/product/:productId',
  authenticateJWT,
  validate({ params: productIdParamSchema }),
  likesCtrl.removeLike
);

module.exports = router;
