const { prisma } = require('../config/db');

const buildDynamicWhere = (filters = {}) => {
  const where = {};

  if (typeof filters.isActive === 'boolean') {
    where.isActive = filters.isActive;
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
  // Soporte tanto para llamada con { filters, sortBy, order, skip, take } como objeto directo
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
      _count: {
        select: { products: true }
      }
    },
    orderBy: { [sortBy]: order }
  };

  if (skip !== undefined) queryOptions.skip = Number(skip);
  if (take !== undefined) queryOptions.take = Number(take);

  return prisma.brand.findMany(queryOptions);
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

