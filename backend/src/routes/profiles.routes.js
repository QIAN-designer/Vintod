const express = require('express');
const router = express.Router();

const profilesCtrl = require('../ctrls/profiles.ctrl');
const validate = require('../middlewares/validate.middleware');
const { updateProfileSchema, getByUsernameSchema } = require('../schemas/profile.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeProfileModification } = require('../middlewares/abac.middleware');

// Perfil del usuario autenticado
router.get('/me', authenticateJWT, profilesCtrl.getMyProfile);

// Perfil público por username
router.get('/u/:username', validate(getByUsernameSchema), profilesCtrl.getProfileByUsername);

// Perfil por userId
router.get('/:userId', profilesCtrl.getProfileByUserId);

// Modificación de perfil protegida por ABAC (Solo el dueño o ADMIN)
router.put(
  '/:userId',
  authenticateJWT,
  authorizeProfileModification,
  validate(updateProfileSchema),
  profilesCtrl.updateProfile
);

module.exports = router;

