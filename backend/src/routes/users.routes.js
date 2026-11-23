const express = require('express');
const router = express.Router();
const profilesService = require('../services/profiles.service');

const usersCtrl = require('../ctrls/users.ctrl');
const validate = require('../middlewares/validate.middleware');
const {
  mongoIdParamSchema,
  userQuerySchema,
  createUserAdminSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
} = require('../schemas/user.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

// Ruta pública para obtener vendedores destacados (Top Sellers)
router.get('/top-sellers', async (req, res, next) => {
  try {
    const profiles = await profilesService.getAllProfiles({ limit: 10 });
    // Mapear al formato esperado por TopSeller (id, username, avatar, rating, sales, etc.)
    const topSellers = profiles.map(p => ({
      id: p.userId || p.id,
      userId: p.userId || p.id,
      username: p.username || 'vendedor',
      fullName: p.username,
      avatarUrl: p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: p.ratingAverage || 4.9,
      ratingAverage: p.ratingAverage || 4.9,
      salesCount: p.ratingCount || 120,
      bio: p.bio || 'Armario curado de moda vintage y streetwear.'
    }));

    res.status(200).json({
      success: true,
      data: topSellers,
    });
  } catch (error) {
    next(error);
  }
});

// Todas las demás rutas de administración de usuarios requieren autenticación y rol ADMIN
router.use(authenticateJWT, authorizeRoles('ADMIN'));

// Listado de usuarios con paginación y filtro de estado (validado con Zod: search, location, role, limit, offset)
router.get('/', validate(userQuerySchema), usersCtrl.getAllUsers);

// Crear usuario desde el panel Admin
router.post('/', validate(createUserAdminSchema), usersCtrl.createUser);

// Detalle de un usuario específico
router.get('/:id', validate(mongoIdParamSchema), usersCtrl.getUserById);

// Suspender o reactivar usuario (isActive: false / true)
router.patch('/:id/status', validate(updateUserStatusSchema), usersCtrl.updateUserStatus);

// Asignar rol a un usuario
router.patch('/:id/role', validate(updateUserRoleSchema), usersCtrl.updateUserRole);

// Restaurar usuario eliminado lógicamente (soft delete)
router.post('/:id/restore', validate(mongoIdParamSchema), usersCtrl.restoreUser);

// Eliminación lógica del usuario (soft delete)
router.delete('/:id', validate(mongoIdParamSchema), usersCtrl.deleteUser);

module.exports = router;
