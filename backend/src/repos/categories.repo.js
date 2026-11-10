const { prisma } = require('../config/db');

const buildDynamicWhere = (filters = {}) => {
  const where = {};

  if (typeof filters.isActive === 'boolean') {
    where.isActive = filters.isActive;
  }

  if (filters.rootOnly) {
    where.parentId = null;
  } else if (filters.parentId) {
    where.parentId = filters.parentId;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { slug: { contains: filters.search, mode: 'insensitive' } }
    ];
  }

  return where;
};

const findAll = async (options = {}) => {
  const isOptionsObj = options && ('filters' in options || 'sortBy' in options || 'order' in options);
  const filters = isOptionsObj ? (options.filters || {}) : options;
  const sortBy = isOptionsObj && options.sortBy ? options.sortBy : 'name';
  const order = isOptionsObj && options.order ? options.order : 'asc';
  const skip = isOptionsObj ? options.skip : undefined;
  const take = isOptionsObj ? options.take : undefined;

  const where = buildDynamicWhere(filters);

  const queryOptions = {
    where,
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
    orderBy: { [sortBy]: order }
  };

  if (skip !== undefined) queryOptions.skip = Number(skip);
  if (take !== undefined) queryOptions.take = Number(take);

  return prisma.category.findMany(queryOptions);
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

