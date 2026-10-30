const { prisma } = require('../config/db');
const { userSafeSelect } = require('./auth.repo');

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

const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: userSafeSelect,
  });
};

const updateStatus = async (id, isActive) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive },
    select: userSafeSelect,
  });
};

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
  findAll,
  findById,
  updateStatus,
  updateRole,
  softDelete,
  restore,
};
