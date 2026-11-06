const { prisma } = require('../config/db');

const findAll = async (filter = {}) => {
  return prisma.category.findMany({
    where: filter,
    include: {
      parent: {
        select: { id: true, name: true, slug: true }
      },
      children: {
        select: { id: true, name: true, slug: true, isActive: true }
      },
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });
};

const findById = async (id) => {
  return prisma.category.findUnique({
    where: { id },
    include: {
      parent: {
        select: { id: true, name: true, slug: true }
      },
      children: {
        select: { id: true, name: true, slug: true, isActive: true }
      },
      _count: {
        select: { products: true }
      }
    }
  });
};

const findBySlug = async (slug) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      parent: {
        select: { id: true, name: true, slug: true }
      },
      children: {
        select: { id: true, name: true, slug: true, isActive: true }
      },
      _count: {
        select: { products: true }
      }
    }
  });
};

const create = async (data) => {
  return prisma.category.create({
    data,
    include: {
      parent: {
        select: { id: true, name: true, slug: true }
      },
      children: true,
      _count: {
        select: { products: true }
      }
    }
  });
};

const update = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
    include: {
      parent: {
        select: { id: true, name: true, slug: true }
      },
      children: true,
      _count: {
        select: { products: true }
      }
    }
  });
};

const remove = async (id) => {
  return prisma.category.delete({
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

