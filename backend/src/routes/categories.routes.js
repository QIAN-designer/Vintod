const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../ctrls/categories.ctrl');

const validate = require('../middlewares/validate.middleware');
const {
  idParamSchema,
  slugParamSchema,
  createCategorySchema,
  updateCategorySchema
} = require('../schemas/categories.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

// Rutas públicas de consulta
// 1. Obtener todas las categorías
router.get('/', categoriesCtrl.getCategories);

// 2. Obtener categoría por slug
router.get(
  '/slug/:slug',
  validate({ params: slugParamSchema }),
  categoriesCtrl.getCategoryBySlug
);

// 3. Obtener categoría por ID
router.get(
  '/:id',
  validate({ params: idParamSchema }),
  categoriesCtrl.getCategoryById
);

// Rutas protegidas (sólo administradores)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ body: createCategorySchema }),
  categoriesCtrl.createCategory
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema, body: updateCategorySchema }),
  categoriesCtrl.updateCategory
);

router.patch(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema, body: updateCategorySchema }),
  categoriesCtrl.updateCategory
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema }),
  categoriesCtrl.deleteCategory
);

module.exports = router;

