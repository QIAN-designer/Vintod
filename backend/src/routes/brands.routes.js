const express = require('express');
const router = express.Router();
const brandsCtrl = require('../ctrls/brands.ctrl');

const validate = require('../middlewares/validate.middleware');
const {
  idParamSchema,
  slugParamSchema,
  createBrandSchema,
  updateBrandSchema
} = require('../schemas/brands.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

// Rutas públicas de consulta
// 1. Obtener todas las marcas
router.get('/', brandsCtrl.getBrands);

// 2. Obtener marca por slug
router.get(
  '/slug/:slug',
  validate({ params: slugParamSchema }),
  brandsCtrl.getBrandBySlug
);

// 3. Obtener marca por ID
router.get(
  '/:id',
  validate({ params: idParamSchema }),
  brandsCtrl.getBrandById
);

// Rutas protegidas (sólo administradores)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ body: createBrandSchema }),
  brandsCtrl.createBrand
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema, body: updateBrandSchema }),
  brandsCtrl.updateBrand
);

router.patch(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema, body: updateBrandSchema }),
  brandsCtrl.updateBrand
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  validate({ params: idParamSchema }),
  brandsCtrl.deleteBrand
);

module.exports = router;

