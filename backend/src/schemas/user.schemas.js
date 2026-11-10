const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const mongoIdParamSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
};

const userQuerySchema = {
  query: z.object({
    search: z.string().optional(),
    q: z.string().optional(),
    location: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    role: z.string().optional(),
    roleId: z.string().regex(objectIdRegex, 'roleId debe ser un ObjectId válido').optional().or(z.literal('')),
    active: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
    isActive: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
    includeDeleted: z.union([z.boolean(), z.enum(['true', 'false', ''])]).optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'email']).optional(),
    order: z.enum(['asc', 'desc', 'ASC', 'DESC']).optional(),
    page: z.union([z.number(), z.string()]).optional(),
    limit: z.union([z.number(), z.string()]).optional(),
    offset: z.union([z.number(), z.string()]).optional(),
  }).passthrough(),
};

const updateUserStatusSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
  body: z.object({
    isActive: z.boolean({ required_error: 'isActive es obligatorio y debe ser booleano' }),
  }),
};

const updateUserRoleSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, 'El ID debe ser un ObjectId de 24 caracteres hexadecimales'),
  }),
  body: z.object({
    roleId: z.string().regex(objectIdRegex, 'roleId debe ser un ObjectId válido').optional(),
    role: z.string().min(1, 'El nombre del rol no puede estar vacío').optional(),
  }).refine(data => data.roleId || data.role, {
    message: 'Debes proporcionar roleId o role',
  }),
};

const createUserAdminSchema = {
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('El email no es válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional().default('Vintod123!'),
    role: z.string().optional().default('USER'),
    city: z.string().optional().default('Madrid'),
  }),
};

module.exports = {
  mongoIdParamSchema,
  userQuerySchema,
  createUserAdminSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
};
