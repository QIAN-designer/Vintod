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
  const filter = {};
  if (query.active !== undefined) {
    filter.isActive = query.active === 'true';
  }
  return categoriesRepo.findAll(filter);
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

