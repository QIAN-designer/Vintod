const express = require('express');
const router = express.Router();
const profilesCtrl = require('../ctrls/profiles.ctrl');
const validate = require('../middlewares/validate.middleware');
const {
  userIdParamSchema,
  profileQuerySchema,
  updateProfileSchema,
  getByUsernameSchema
} = require('../schemas/profile.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeProfileModification } = require('../middlewares/abac.middleware');

// Endpoint público para vendedores destacados (Top Sellers)
router.get('/top-sellers', async (req, res, next) => {
  try {
    const profiles = await profilesCtrl.getProfilesInternal ? await profilesCtrl.getProfilesInternal({ limit: 10 }) : [];
    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
});

// Listado/búsqueda de perfiles con filtros dinámicos validados por Zod (search, location, host, limit, offset)
router.get('/', validate(profileQuerySchema), profilesCtrl.getProfiles);

// Perfil del usuario autenticado
router.get('/me', authenticateJWT, profilesCtrl.getMyProfile);

// Perfil público por username
router.get('/u/:username', validate(getByUsernameSchema), profilesCtrl.getProfileByUsername);

// Perfil por userId (validado con Zod)
router.get('/:userId', validate(userIdParamSchema), profilesCtrl.getProfileByUserId);

// Modificación parcial de perfil protegida por ABAC (Solo el dueño o ADMIN)
router.patch(
  '/:userId',
  authenticateJWT,
  authorizeProfileModification,
  validate(updateProfileSchema),
  profilesCtrl.updateProfile
);

// Mantenemos compatibilidad con PUT redirigiendo al mismo controlador
router.put(
  '/:userId',
  authenticateJWT,
  authorizeProfileModification,
  validate(updateProfileSchema),
  profilesCtrl.updateProfile
);

module.exports = router;
