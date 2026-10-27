const { z } = require('zod');

const mongoIdParamSchema = {
  params: z.object({
    id: z.string().length(24, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
};

const updateUserStatusSchema = {
  params: z.object({
    id: z.string().length(24, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
  body: z.object({
    isActive: z.boolean({ required_error: 'isActive es obligatorio y debe ser booleano' }),
  }),
};

const updateUserRoleSchema = {
  params: z.object({
    id: z.string().length(24, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
  body: z.object({
    roleId: z.string().length(24, 'roleId debe ser un ObjectId válido'),
  }),
};

module.exports = {
  mongoIdParamSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
};

