const { prisma } = require('../config/db');

// Selección segura de campos de usuario para nunca exponer passwords
const userSafeSelect = {
  id: true,
  email: true,
  isActive: true,
  deletedAt: true,
  roleId: true,
  createdAt: true,
  updatedAt: true,
  role: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
  profile: {
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      bio: true,
      city: true,
      country: true,
      postalCode: true,
      ratingAverage: true,
      ratingCount: true,
    },
  },
};

/**
 * Listado de usuarios con paginación y filtro de estado/eliminados
 */
const findAll = async ({ skip = 0, take = 20, isActive, includeDeleted = false }) => {
  const where = {};
  
  if (!includeDeleted) {
    where.OR = [{ deletedAt: null }, { deletedAt: { isSet: false } }];
  }

  if (typeof isActive === 'boolean') {
    where.isActive = isActive;
  }

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      orderBy: { createdAt: 'desc' },
      select: userSafeSelect,
    }),
  ]);

  return { total, users };
};

/**
 * Busca un usuario por ID con perfil y rol
 */
const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: userSafeSelect,
  });
};

/**
 * Busca un usuario por email (incluye password para proceso de autenticación)
 */
const findByEmailWithPassword = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
      profile: true,
    },
  });
};

/**
 * Busca un usuario por email con datos seguros
 */
const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    select: userSafeSelect,
  });
};

/**
 * Busca un rol por nombre (ej: "USER", "ADMIN")
 */
const findRoleByName = async (name) => {
  return await prisma.role.findUnique({
    where: { name },
  });
};

/**
 * Crea un rol si no existe
 */
const ensureRole = async (name, description) => {
  let role = await prisma.role.findUnique({ where: { name } });
  if (!role) {
    role = await prisma.role.create({
      data: { name, description },
    });
  }
  return role;
};

/**
 * Crea de forma atómica un User y su Profile
 */
const createUserWithProfile = async ({ email, password, roleId, profileData }) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      roleId,
      profile: {
        create: {
          username: profileData.username,
          avatarUrl: profileData.avatarUrl || null,
          bio: profileData.bio || null,
          city: profileData.city || null,
          country: profileData.country || 'España',
          postalCode: profileData.postalCode || null,
        },
      },
    },
    select: userSafeSelect,
  });
};

/**
 * Actualiza el estado activo/inactivo de un usuario
 */
const updateStatus = async (id, isActive) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive },
    select: userSafeSelect,
  });
};

/**
 * Actualiza el rol de un usuario
 */
const updateRole = async (id, roleId) => {
  return await prisma.user.update({
    where: { id },
    data: { roleId },
    select: userSafeSelect,
  });
};

/**
 * Eliminación lógica (Soft Delete):
 * Establece deletedAt a la fecha actual y desactiva la cuenta (isActive: false)
 */
const softDelete = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      isActive: false,
    },
    select: userSafeSelect,
  });
};

/**
 * Restaurar usuario eliminado lógicamente:
 * Restablece deletedAt a null y vuelve a activar la cuenta
 */
const restore = async (id) => {
  return await prisma.user.update({
    where: { id },
    data: {
      deletedAt: null,
      isActive: true,
    },
    select: userSafeSelect,
  });
};

module.exports = {
  userSafeSelect,
  findAll,
  findById,
  findByEmailWithPassword,
  findByEmail,
  findRoleByName,
  ensureRole,
  createUserWithProfile,
  updateStatus,
  updateRole,
  softDelete,
  restore,
};
