const { z } = require('zod');

// Schema for MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const idParamSchema = z.object({
  id: z.string().regex(objectIdRegex, 'El identificador no tiene un formato válido (debe ser un ObjectId de 24 caracteres)')
});

const slugParamSchema = z.object({
  slug: z.string().min(1, 'El slug es obligatorio')
});

const productQuerySchema = z.object({
  search: z.string().optional(),
  q: z.string().optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  categoryId: z.string().regex(objectIdRegex, 'categoryId debe ser un ObjectId válido').optional().or(z.literal('')),
  host: z.string().optional(),
  hostId: z.string().regex(objectIdRegex, 'hostId debe ser un ObjectId válido').optional().or(z.literal('')),
  seller: z.string().optional(),
  sellerId: z.string().regex(objectIdRegex, 'sellerId debe ser un ObjectId válido').optional().or(z.literal('')),
  brand: z.string().optional(),
  brandId: z.string().regex(objectIdRegex, 'brandId debe ser un ObjectId válido').optional().or(z.literal('')),
  condition: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  status: z.enum(['available', 'reserved', 'sold', 'hidden']).optional().or(z.literal('')),
  active: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  isActive: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
  minPrice: z.union([z.number(), z.string()]).optional(),
  maxPrice: z.union([z.number(), z.string()]).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'viewsCount', 'price']).optional(),
  order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
  page: z.union([z.number(), z.string()]).optional(),
  limit: z.union([z.number(), z.string()]).optional(),
  offset: z.union([z.number(), z.string()]).optional()
}).passthrough();

const createProductSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().positive('El precio debe ser un número positivo'),
  brand: z.string().min(1, 'La marca es obligatoria'),
  category: z.string().optional(),
  categoryId: z.string().regex(objectIdRegex, 'categoryId inválido').optional(),
  brandId: z.string().regex(objectIdRegex, 'brandId inválido').optional(),
  sellerId: z.string().regex(objectIdRegex, 'sellerId inválido').optional(),
  hostId: z.string().regex(objectIdRegex, 'hostId inválido').optional(),
  size: z.string().min(1, 'La talla es obligatoria'),
  color: z.string().optional(),
  condition: z.string().min(1, 'El estado/condición es obligatorio'),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['available', 'reserved', 'sold', 'hidden']).optional()
});

// Partial hace que todos los campos sean opcionales para el PUT/PATCH
const updateProductSchema = createProductSchema.partial();

module.exports = {
  idParamSchema,
  slugParamSchema,
  productQuerySchema,
  createProductSchema,
  updateProductSchema
};
