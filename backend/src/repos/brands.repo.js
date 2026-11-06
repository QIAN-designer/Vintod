const { prisma } = require('../config/db');

const findAll = async (filter = {}) => {
  return prisma.brand.findMany({
    where: filter,
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });
};

const findById = async (id) => {
  return prisma.brand.findUnique({
    where: { id },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

const findBySlug = async (slug) => {
  return prisma.brand.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

const create = async (data) => {
  return prisma.brand.create({
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

const update = async (id, data) => {
  return prisma.brand.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
};

const remove = async (id) => {
  return prisma.brand.delete({
    where: { id }
  });
};

module.exports = {
  findAll,
  findById,
  findBySlug,
  create,
  update,
  remove
};

