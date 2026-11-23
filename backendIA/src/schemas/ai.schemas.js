const { z } = require('zod');

const askProductSchema = z.object({
  question: z.string().min(2, 'La pregunta debe tener al menos 2 caracteres').max(1000, 'La pregunta es demasiado larga'),
  product: z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.number(), z.string()]).optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    size: z.string().optional(),
    condition: z.string().optional(),
    color: z.string().optional(),
    sellerName: z.string().optional(),
    visits: z.number().optional()
  }).passthrough().optional().default({}),
  products: z.array(z.any()).optional().default([]),
  filters: z.record(z.any()).optional().default({}),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    })
  ).optional().default([])
});

const askCatalogSchema = z.object({
  question: z.string().min(2, 'La pregunta debe tener al menos 2 caracteres').max(1000, 'La pregunta es demasiado larga'),
  products: z.array(z.any()).optional().default([]),
  filters: z.record(z.any()).optional().default({}),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    })
  ).optional().default([])
});

module.exports = {
  askProductSchema,
  askCatalogSchema
};
