const { z } = require('zod');

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

const idParamSchema = z.object({
  id: z.string().regex(mongoIdRegex, 'El ID de la categoría no es un ObjectId válido')
});

const slugParamSchema = z.object({
  slug: z.string().min(1, 'El slug es obligatorio')
});

const categoryQuerySchema = z.object({
  search: z.string().optional(),
  q: z.string().optional(),
  active: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  isActive: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  parentId: z.string().regex(mongoIdRegex, 'parentId debe ser un ObjectId válido').optional().or(z.literal('')),
  rootOnly: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
  page: z.union([z.number(), z.string()]).optional(),
  limit: z.union([z.number(), z.string()]).optional(),
  offset: z.union([z.number(), z.string()]).optional()
}).passthrough();

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
  categoryQuerySchema,
  createCategorySchema,
  updateCategorySchema
};
