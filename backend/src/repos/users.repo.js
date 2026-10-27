const { prisma } = require('../config/db');
const { userSafeSelect } = require('./auth.repo');

const findAll = async ({ skip = 0, take = 20, isActive }) => {
  const where = {};
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

const deleteUser = async (id) => {
  // Con integridad referencial configurada:
  // Si tiene perfil o productos asociados, Prisma lanzará error si onDelete es Restrict
  return await prisma.user.delete({
    where: { id },
    select: userSafeSelect,
  });
};

module.exports = {
  findAll,
  findById,
  updateStatus,
  updateRole,
  deleteUser,
};

