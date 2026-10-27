const profilesService = require('../services/profiles.service');

const getMyProfile = async (req, res, next) => {
  try {
    const profile = await profilesService.getProfileByUserId(req.user.id);
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const getProfileByUsername = async (req, res, next) => {
  try {
    const profile = await profilesService.getProfileByUsername(req.params.username);
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await profilesService.getProfileByUserId(req.params.userId);
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const targetUserId = req.params.userId;
    const profile = await profilesService.updateProfile(targetUserId, req.body);
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyProfile,
  getProfileByUsername,
  getProfileByUserId,
  updateProfile,
};

