const { z } = require('zod');

const registerSchema = {
  body: z.object({
    email: z.string().email('Email con formato inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    username: z
      .string()
      .min(3, 'El username debe tener al menos 3 caracteres')
      .max(30, 'El username no puede exceder 30 caracteres')
      .regex(/^[a-zA-Z0-9_.-]+$/, 'El username solo puede contener letras, números, puntos, guiones y guiones bajos'),
    avatarUrl: z.string().url('avatarUrl debe ser una URL válida').optional().nullable(),
    bio: z.string().max(500, 'La biografía no puede exceder 500 caracteres').optional().nullable(),
    city: z.string().max(100).optional().nullable(),
    country: z.string().max(100).optional().nullable(),
    postalCode: z.string().max(20).optional().nullable(),
  }),
};

const loginSchema = {
  body: z.object({
    email: z.string().email('Email con formato inválido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
};

