const AppError = require('./utils/appError');
const profilesRepo = require('../repos/profiles.repo');

const getAllProfiles = async (query = {}) => {
  const { search, q, location, city, country, host, minRating, sortBy = 'ratingAverage', order = 'desc', page, limit, offset } = query;

  const filters = {
    search: (search || q || host || '').trim() || undefined,
    location: location ? location.trim() : undefined,
    city: city ? city.trim() : undefined,
    country: country ? country.trim() : undefined,
  };

  if (minRating !== undefined && minRating !== '') {
    const parsed = parseFloat(minRating);
    if (!Number.isNaN(parsed)) filters.minRating = parsed;
  }

  const allowedSortFields = ['ratingAverage', 'ratingCount', 'createdAt', 'username'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'ratingAverage';
  const sortOrder = String(order).toLowerCase() === 'asc' ? 'asc' : 'desc';

  let skip;
  let take;
  if (offset !== undefined || page !== undefined || limit !== undefined) {
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    take = limitNum;

    if (offset !== undefined && offset !== '') {
      skip = Math.max(0, parseInt(offset, 10) || 0);
    } else {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      skip = (pageNum - 1) * limitNum;
    }
  }

  return profilesRepo.findAll({ filters, sortBy: sortField, order: sortOrder, skip, take });
};

const getProfileByUserId = async (userId) => {
  const profile = await profilesRepo.findByUserId(userId);
  if (!profile) {
    throw new AppError('Perfil no encontrado para este usuario', 404);
  }
  return profile;
};

const getProfileByUsername = async (username) => {
  const profile = await profilesRepo.findByUsername(username);
  if (!profile) {
    throw new AppError(`Perfil no encontrado para el usuario @${username}`, 404);
  }
  return profile;
};

const updateProfile = async (userId, data) => {
  // Si cambia de username, verificar unicidad
  if (data.username) {
    const existing = await profilesRepo.findByUsername(data.username);
    if (existing && existing.userId !== userId) {
      throw new AppError('El nombre de usuario ya está en uso por otra persona', 400);
    }
  }

  const updated = await profilesRepo.updateByUserId(userId, data);
  return updated;
};

module.exports = {
  getAllProfiles,
  getProfileByUserId,
  getProfileByUsername,
  updateProfile,
};

