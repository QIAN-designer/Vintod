const { prisma } = require('../config/db');

const buildDynamicWhere = (filters = {}) => {
  const where = {};

  if (filters.city) {
    where.city = { equals: filters.city, mode: 'insensitive' };
  }

  if (filters.country) {
    where.country = { equals: filters.country, mode: 'insensitive' };
  }

  if (filters.minRating !== undefined) {
    where.ratingAverage = { gte: filters.minRating };
  }

  if (filters.search) {
    where.OR = [
      { username: { contains: filters.search, mode: 'insensitive' } },
      { bio: { contains: filters.search, mode: 'insensitive' } },
      { city: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return where;
};

const findAll = async ({ filters = {}, sortBy = 'ratingAverage', order = 'desc', skip, take } = {}) => {
  const where = buildDynamicWhere(filters);

  const queryOptions = {
    where,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          isActive: true,
          role: true,
          createdAt: true,
        },
      },
    },
    orderBy: { [sortBy]: order },
  };

  if (skip !== undefined) queryOptions.skip = Number(skip);
  if (take !== undefined) queryOptions.take = Number(take);

  return prisma.profile.findMany(queryOptions);
};

const findByUserId = async (userId) => {
  return await prisma.profile.findUnique({
    where: { userId },
  });
};

const findByUsername = async (username) => {
  return await prisma.profile.findUnique({
    where: { username },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          isActive: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });
};

const updateByUserId = async (userId, data) => {
  return await prisma.profile.update({
    where: { userId },
    data,
  });
};

const deleteByUserId = async (userId) => {
  return await prisma.profile.delete({
    where: { userId },
  });
};

module.exports = {
  findAll,
  findByUserId,
  findByUsername,
  updateByUserId,
  deleteByUserId,
};

