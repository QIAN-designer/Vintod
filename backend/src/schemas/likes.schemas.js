const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const productIdParamSchema = z.object({
  productId: z.string().regex(objectIdRegex, 'El ID del producto no es un ObjectId válido'),
});

module.exports = {
  productIdParamSchema,
};
