const { z } = require('zod');

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

const idParamSchema = z.object({
  id: z.string().regex(mongoIdRegex, 'El ID de la categoría no es un ObjectId válido')
});

const slugParamSchema = z.object({
  slug: z.string().min(1, 'El slug es obligatorio')
});

const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría es obligatorio').trim(),
  slug: z.string().min(1, 'El slug es obligatorio').trim().optional(),
  parentId: z.string().regex(mongoIdRegex, 'El parentId debe ser un ObjectId válido').nullable().optional(),
  isActive: z.boolean().optional().default(true)
});

const updateCategorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoría no puede estar vacío').trim().optional(),
  slug: z.string().min(1, 'El slug no puede estar vacío').trim().optional(),
  parentId: z.string().regex(mongoIdRegex, 'El parentId debe ser un ObjectId válido').nullable().optional(),
  isActive: z.boolean().optional()
});

module.exports = {
  idParamSchema,
  slugParamSchema,
  createCategorySchema,
  updateCategorySchema
};

