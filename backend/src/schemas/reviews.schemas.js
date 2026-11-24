const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const userIdParamSchema = z.object({
  userId: z.string().regex(objectIdRegex, 'El ID del usuario no es un ObjectId válido'),
});

const reviewIdParamSchema = z.object({
  reviewId: z.string().regex(objectIdRegex, 'El ID de la valoración no es un ObjectId válido'),
});

const createReviewSchema = z.object({
  rating: z
    .number({ message: 'La puntuación debe ser un número entero entre 1 y 5' })
    .int('La puntuación debe ser un número entero')
    .min(1, 'La puntuación mínima es 1')
    .max(5, 'La puntuación máxima es 5'),
  comment: z
    .string()
    .trim()
    .max(500, 'El comentario no puede superar los 500 caracteres')
    .optional()
    .or(z.literal('')),
});

module.exports = {
  userIdParamSchema,
  reviewIdParamSchema,
  createReviewSchema,
};
