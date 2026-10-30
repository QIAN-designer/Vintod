const AppError = require('./utils/appError');
const usersRepo = require('../repos/users.repo');
const { prisma } = require('../config/db');

const listUsers = async ({ page = 1, limit = 20, isActive, includeDeleted }) => {
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const take = Number(limit);

  let activeFilter;
  if (isActive === 'true') activeFilter = true;
  if (isActive === 'false') activeFilter = false;

  const { total, users } = await usersRepo.findAll({
    skip,
    take,
    isActive: activeFilter,
    includeDeleted: includeDeleted === 'true',
  });

  return {
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / take),
    },
  };
};

const getUserById = async (id) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return user;
};

const setUserStatus = async (id, isActive) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return await usersRepo.updateStatus(id, isActive);
};

const setUserRole = async (id, roleId) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  // Integridad referencial: Comprobar que el rol existe en base de datos
  const role = await prisma.role.findUnique({
    where: { id: roleId },
  });
  if (!role) {
    throw new AppError('El rol especificado no existe', 404);
  }

  return await usersRepo.updateRole(id, roleId);
};

/**
 * Realiza el Soft Delete de un usuario
 */
const deleteUser = async (id) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  if (user.deletedAt) {
    throw new AppError('El usuario ya ha sido eliminado previamente', 400);
  }

  return await usersRepo.softDelete(id);
};

/**
 * Restaura un usuario previamente eliminado por soft delete
 */
const restoreUser = async (id) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  if (!user.deletedAt) {
    throw new AppError('El usuario no está eliminado', 400);
  }

  return await usersRepo.restore(id);
};

module.exports = {
  listUsers,
  getUserById,
  setUserStatus,
  setUserRole,
  deleteUser,
  restoreUser,
};
