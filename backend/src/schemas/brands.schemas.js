const { z } = require('zod');

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

const idParamSchema = z.object({
  id: z.string().regex(mongoIdRegex, 'El ID de la marca no es un ObjectId válido')
});

const slugParamSchema = z.object({
  slug: z.string().min(1, 'El slug es obligatorio')
});

const brandQuerySchema = z.object({
  search: z.string().optional(),
  q: z.string().optional(),
  active: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  isActive: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
  page: z.union([z.number(), z.string()]).optional(),
  limit: z.union([z.number(), z.string()]).optional(),
  offset: z.union([z.number(), z.string()]).optional()
}).passthrough();

const createBrandSchema = z.object({
  name: z.string().min(1, 'El nombre de la marca es obligatorio').trim(),
  slug: z.string().min(1, 'El slug es obligatorio').trim().optional(),
  logoUrl: z.string().url('URL de logo inválida').nullable().optional(),
  images: z.array(z.string().url('URL de imagen inválida')).optional().default([]),
  isActive: z.boolean().optional().default(true)
});

const updateBrandSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío').trim().optional(),
  slug: z.string().min(1, 'El slug no puede estar vacío').trim().optional(),
  logoUrl: z.string().url('URL de logo inválida').nullable().optional(),
  images: z.array(z.string().url('URL de imagen inválida')).optional(),
  isActive: z.boolean().optional()
});

module.exports = {
  idParamSchema,
  slugParamSchema,
  brandQuerySchema,
  createBrandSchema,
  updateBrandSchema
};
