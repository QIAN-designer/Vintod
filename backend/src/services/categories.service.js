const categoriesRepo = require('../repos/categories.repo');
const AppError = require('./utils/appError');

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

const getAllCategories = async (query = {}) => {
  const { active, isActive, search, q, parentId, rootOnly, sortBy = 'name', order = 'asc', page, limit, offset } = query;
  const filters = {
    search: (search || q || '').trim() || undefined,
    parentId: parentId ? parentId.trim() : undefined,
    rootOnly: rootOnly === 'true' || rootOnly === true,
  };

  const rawActive = isActive !== undefined ? isActive : active;
  if (rawActive !== undefined && rawActive !== '') {
    filters.isActive = rawActive === 'true' || rawActive === true;
  }

  const allowedSortFields = ['name', 'createdAt', 'updatedAt'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
  const sortOrder = String(order).toLowerCase() === 'desc' ? 'desc' : 'asc';

  let skip;
  let take;
  if (offset !== undefined || page !== undefined || limit !== undefined) {
    const limitNum = Math.max(1, parseInt(limit, 10) || 50);
    take = limitNum;

    if (offset !== undefined && offset !== '') {
      skip = Math.max(0, parseInt(offset, 10) || 0);
    } else {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      skip = (pageNum - 1) * limitNum;
    }
  }

  return categoriesRepo.findAll({ filters, sortBy: sortField, order: sortOrder, skip, take });
};

const getCategoryById = async (id) => {
  const category = await categoriesRepo.findById(id);
  if (!category) {
    throw new AppError('Categoría no encontrada', 404);
  }
  return category;
};

const getCategoryBySlug = async (slug) => {
  const category = await categoriesRepo.findBySlug(slug);
  if (!category) {
    throw new AppError('Categoría no encontrada con ese slug', 404);
  }
  return category;
};

const createCategory = async (data) => {
  const slug = data.slug || generateSlug(data.name);

  const existingSlug = await categoriesRepo.findBySlug(slug);
  if (existingSlug) {
    throw new AppError('Ya existe una categoría con ese slug o nombre', 409);
  }

  if (data.parentId) {
    const parent = await categoriesRepo.findById(data.parentId);
    if (!parent) {
      throw new AppError('La categoría padre especificada no existe', 404);
    }
  }

  return categoriesRepo.create({
    name: data.name,
    slug,
    parentId: data.parentId || null,
    isActive: data.isActive !== undefined ? data.isActive : true
  });
};

const updateCategory = async (id, data) => {
  await getCategoryById(id);

  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);
  }

  if (data.slug) {
    const existing = await categoriesRepo.findBySlug(data.slug);
    if (existing && existing.id !== id) {
      throw new AppError('Ya existe otra categoría con ese slug o nombre', 409);
    }
  }

  if (data.parentId) {
    if (data.parentId === id) {
      throw new AppError('Una categoría no puede ser su propio padre', 400);
    }
    const parent = await categoriesRepo.findById(data.parentId);
    if (!parent) {
      throw new AppError('La categoría padre especificada no existe', 404);
    }
  }

  return categoriesRepo.update(id, data);
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);

  if (category._count?.products > 0) {
    throw new AppError('No se puede eliminar la categoría porque tiene productos asociados', 400);
  }

  if (category.children && category.children.length > 0) {
    throw new AppError('No se puede eliminar la categoría porque tiene subcategorías asociadas', 400);
  }

  return categoriesRepo.remove(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};

