const AppError = require('../services/utils/appError');
const usersRepo = require('../repos/users.repo');
const authRepo = require('../repos/auth.repo');
const { prisma } = require('../config/db');

const listUsers = async ({ page = 1, limit = 20, isActive }) => {
  const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
  const take = Number(limit);

  let activeFilter;
  if (isActive === 'true') activeFilter = true;
  if (isActive === 'false') activeFilter = false;

  const { total, users } = await usersRepo.findAll({
    skip,
    take,
    isActive: activeFilter,
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

const deleteUser = async (id) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  // Integridad referencial: Evitar eliminar usuario si tiene prendas asociadas en venta
  const productsCount = await prisma.product.count({
    where: { sellerId: id },
  });
  if (productsCount > 0) {
    throw new AppError(
      `No se puede eliminar el usuario porque tiene ${productsCount} prenda(s) asociada(s) en el catálogo. Reasigne o elimine las prendas primero.`,
      400
    );
  }

  // Si no tiene productos, el usuario y su perfil (onDelete: Cascade) se eliminan limpiamente
  return await usersRepo.deleteUser(id);
};

module.exports = {
  listUsers,
  getUserById,
  setUserStatus,
  setUserRole,
  deleteUser,
};
