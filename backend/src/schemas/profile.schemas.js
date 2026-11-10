const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const userIdParamSchema = {
  params: z.object({
    userId: z.string().regex(objectIdRegex, 'ID de usuario debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
};

const profileQuerySchema = {
  query: z.object({
    search: z.string().optional(),
    q: z.string().optional(),
    location: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    host: z.string().optional(),
    minRating: z.union([z.number(), z.string()]).optional(),
    sortBy: z.enum(['ratingAverage', 'ratingCount', 'createdAt', 'username']).optional(),
    order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
    page: z.union([z.number(), z.string()]).optional(),
    limit: z.union([z.number(), z.string()]).optional(),
    offset: z.union([z.number(), z.string()]).optional(),
  }).passthrough(),
};

const updateProfileSchema = {
  params: z.object({
    userId: z.string().regex(objectIdRegex, 'ID de usuario debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
  body: z
    .object({
      username: z
        .string()
        .min(3, 'El username debe tener al menos 3 caracteres')
        .max(30, 'El username no puede exceder 30 caracteres')
        .regex(/^[a-zA-Z0-9_.-]+$/, 'El username solo puede contener letras, números, puntos y guiones')
        .optional(),
      avatarUrl: z.string().url('avatarUrl debe ser una URL válida').optional().nullable(),
      bio: z.string().max(500, 'La biografía no puede exceder 500 caracteres').optional().nullable(),
      city: z.string().max(100).optional().nullable(),
      country: z.string().max(100).optional().nullable(),
      postalCode: z.string().max(20).optional().nullable(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Debe proporcionar al menos un campo para actualizar',
    }),
};

const getByUsernameSchema = {
  params: z.object({
    username: z.string().min(1, 'Username requerido'),
  }),
};

module.exports = {
  userIdParamSchema,
  profileQuerySchema,
  updateProfileSchema,
  getByUsernameSchema,
};
