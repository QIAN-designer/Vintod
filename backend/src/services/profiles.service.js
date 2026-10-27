const AppError = require('./utils/appError');
const profilesRepo = require('../repos/profiles.repo');

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
  getProfileByUserId,
  getProfileByUsername,
  updateProfile,
};

