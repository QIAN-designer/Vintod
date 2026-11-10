const brandsRepo = require('../repos/brands.repo');
const AppError = require('./utils/appError');

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
};

const getAllBrands = async (query = {}) => {
  const { active, isActive, search, q, sortBy = 'name', order = 'asc', page, limit } = query;
  const filters = {
    search: (search || q || '').trim() || undefined,
  };

  const rawActive = isActive !== undefined ? isActive : active;
  if (rawActive !== undefined) {
    filters.isActive = rawActive === 'true' || rawActive === true;
  }

  const allowedSortFields = ['name', 'createdAt', 'updatedAt'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
  const sortOrder = String(order).toLowerCase() === 'desc' ? 'desc' : 'asc';

  let skip;
  let take;
  if (page !== undefined || limit !== undefined) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 50);
    skip = (pageNum - 1) * limitNum;
    take = limitNum;
  }

  return brandsRepo.findAll({ filters, sortBy: sortField, order: sortOrder, skip, take });
};

const getBrandById = async (id) => {
  const brand = await brandsRepo.findById(id);
  if (!brand) {
    throw new AppError('Marca no encontrada', 404);
  }
  return brand;
};

const getBrandBySlug = async (slug) => {
  const brand = await brandsRepo.findBySlug(slug);
  if (!brand) {
    throw new AppError('Marca no encontrada con ese slug', 404);
  }
  return brand;
};

const createBrand = async (data) => {
  const slug = data.slug || generateSlug(data.name);

  const existingSlug = await brandsRepo.findBySlug(slug);
  if (existingSlug) {
    throw new AppError('Ya existe una marca con ese slug o nombre', 409);
  }

  return brandsRepo.create({
    name: data.name,
    slug,
    logoUrl: data.logoUrl || null,
    images: data.images || [],
    isActive: data.isActive !== undefined ? data.isActive : true
  });
};

const updateBrand = async (id, data) => {
  await getBrandById(id);

  if (data.name && !data.slug) {
    data.slug = generateSlug(data.name);
  }

  if (data.slug) {
    const existing = await brandsRepo.findBySlug(data.slug);
    if (existing && existing.id !== id) {
      throw new AppError('Ya existe otra marca con ese slug o nombre', 409);
    }
  }

  return brandsRepo.update(id, data);
};

const deleteBrand = async (id) => {
  const brand = await getBrandById(id);

  if (brand._count?.products > 0) {
    throw new AppError('No se puede eliminar la marca porque tiene productos asociados', 400);
  }

  return brandsRepo.remove(id);
};

module.exports = {
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  createBrand,
  updateBrand,
  deleteBrand
};

