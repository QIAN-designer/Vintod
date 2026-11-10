const AppError = require('./utils/appError');
const usersRepo = require('../repos/users.repo');
const profilesRepo = require('../repos/profiles.repo');
const { hashPassword } = require('../utils/password.util');
const { prisma } = require('../config/db');

const listUsers = async (query = {}) => {
  const {
    page = 1,
    limit = 20,
    offset,
    isActive,
    active,
    includeDeleted,
    search,
    q,
    location,
    city,
    country,
    role,
    roleId,
    sortBy = 'createdAt',
    order = 'desc',
  } = query;

  const take = Math.max(1, Number(limit) || 20);
  let skip;
  if (offset !== undefined && offset !== '') {
    skip = Math.max(0, Number(offset) || 0);
  } else {
    const pageNum = Math.max(1, Number(page) || 1);
    skip = (pageNum - 1) * take;
  }

  let activeFilter;
  const rawActive = isActive !== undefined ? isActive : active;
  if (rawActive === 'true' || rawActive === true) activeFilter = true;
  if (rawActive === 'false' || rawActive === false) activeFilter = false;

  const allowedSortFields = ['createdAt', 'updatedAt', 'email'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = String(order).toLowerCase() === 'asc' ? 'asc' : 'desc';

  const { total, users } = await usersRepo.findAll({
    skip,
    take,
    isActive: activeFilter,
    includeDeleted: includeDeleted === 'true' || includeDeleted === true,
    search: (search || q || '').trim() || undefined,
    location: (location || city || country || '').trim() || undefined,
    role: role ? role.trim() : undefined,
    roleId: roleId ? roleId.trim() : undefined,
    sortBy: sortField,
    order: sortOrder,
  });

  const currentPage = Math.floor(skip / take) + 1;

  return {
    users,
    pagination: {
      total,
      page: currentPage,
      limit: take,
      offset: skip,
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

const createUser = async ({ name, email, password = 'Vintod123!', role = 'USER', city = 'Madrid' }) => {
  const existingEmail = await usersRepo.findByEmail(email);
  if (existingEmail) {
    throw new AppError('El correo electrónico ya está registrado', 400);
  }

  let baseUsername = String(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_.-]/g, '');
  if (!baseUsername || baseUsername.length < 3) {
    baseUsername = email.split('@')[0].replace(/[^a-z0-9_.-]/gi, '');
  }

  let username = baseUsername;
  const existingUsername = await profilesRepo.findByUsername(username);
  if (existingUsername) {
    username = `${baseUsername}_${Math.floor(100 + Math.random() * 900)}`;
  }

  const hashedPassword = await hashPassword(password);
  const roleName = String(role || 'USER').toUpperCase().trim();
  const roleEntity = await usersRepo.ensureRole(roleName, `Rol ${roleName} del sistema`);

  return await usersRepo.createUserWithProfile({
    email,
    password: hashedPassword,
    roleId: roleEntity.id,
    profileData: {
      username,
      city: city || 'Madrid',
    },
  });
};

const setUserStatus = async (id, isActive) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return await usersRepo.updateStatus(id, isActive);
};

const setUserRole = async (id, rolePayload) => {
  const user = await usersRepo.findById(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  let targetRoleId = typeof rolePayload === 'string' ? rolePayload : rolePayload?.roleId;

  if (!targetRoleId && rolePayload?.role) {
    const roleName = String(rolePayload.role).toUpperCase().trim();
    const roleEntity = await usersRepo.ensureRole(roleName, `Rol ${roleName} del sistema`);
    targetRoleId = roleEntity.id;
  }

  // Integridad referencial: Comprobar que el rol existe en base de datos
  const role = await prisma.role.findUnique({
    where: { id: targetRoleId },
  });
  if (!role) {
    throw new AppError('El rol especificado no existe', 404);
  }

  return await usersRepo.updateRole(id, targetRoleId);
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
  createUser,
  setUserStatus,
  setUserRole,
  deleteUser,
  restoreUser,
};
