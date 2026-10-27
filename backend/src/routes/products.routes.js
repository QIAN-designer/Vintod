const express = require('express');
const router = express.Router();
const productsCtrl = require('../ctrls/products.ctrl');

const validate = require('../middlewares/validate.middleware');
const {
  idParamSchema,
  slugParamSchema,
  createProductSchema,
  updateProductSchema
} = require('../schemas/products.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');
const { authorizeProductModification } = require('../middlewares/abac.middleware');

// 1. Rutas específicas (DEBEN ir ANTES de las rutas con parámetro dinámico :id)
// Catálogo general activo
router.get('/', productsCtrl.getProducts);

// Backoffice / Papelera de productos eliminados
router.get('/deleted', productsCtrl.getDeletedProducts);

// Búsqueda por slug
router.get('/slug/:slug', validate({ params: slugParamSchema }), productsCtrl.getProductBySlug);

// 2. Creación de productos (USER o ADMIN si viene autenticado, o anónimo con vendedor por defecto)
router.post(
  '/',
  validate({ body: createProductSchema }),
  productsCtrl.createProduct
);

// 3. Rutas con parámetro dinámico :id
router.get('/:id', validate({ params: idParamSchema }), productsCtrl.getProductById);

// Restaurar producto desde la papelera
router.post(
  '/:id/restore',
  validate({ params: idParamSchema }),
  productsCtrl.restoreProduct
);

// Edición de productos
router.put(
  '/:id',
  validate({ params: idParamSchema, body: updateProductSchema }),
  productsCtrl.updateProduct
);

router.patch(
  '/:id',
  validate({ params: idParamSchema, body: updateProductSchema }),
  productsCtrl.patchProduct
);

// Activar / Desactivar producto
router.patch(
  '/:id/activate',
  validate({ params: idParamSchema }),
  productsCtrl.activateProduct
);

router.patch(
  '/:id/deactivate',
  validate({ params: idParamSchema }),
  productsCtrl.deactivateProduct
);

// Eliminación (Soft Delete)
router.delete(
  '/:id',
  validate({ params: idParamSchema }),
  productsCtrl.softDeleteProduct
);

module.exports = router;