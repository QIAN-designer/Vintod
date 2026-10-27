const express = require('express');
const router = express.Router();

const usersCtrl = require('../ctrls/users.ctrl');
const validate = require('../middlewares/validate.middleware');
const {
  mongoIdParamSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
} = require('../schemas/user.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

// Todas las rutas de administración de usuarios requieren autenticación y rol ADMIN
router.use(authenticateJWT, authorizeRoles('ADMIN'));

// Listado de usuarios con paginación y filtro de estado
router.get('/', usersCtrl.getAllUsers);

// Detalle de un usuario específico
router.get('/:id', validate(mongoIdParamSchema), usersCtrl.getUserById);

// Suspender o reactivar usuario (isActive: false / true)
router.patch('/:id/status', validate(updateUserStatusSchema), usersCtrl.updateUserStatus);

// Asignar rol a un usuario
router.patch('/:id/role', validate(updateUserRoleSchema), usersCtrl.updateUserRole);

// Eliminar usuario
router.delete('/:id', validate(mongoIdParamSchema), usersCtrl.deleteUser);

module.exports = router;

