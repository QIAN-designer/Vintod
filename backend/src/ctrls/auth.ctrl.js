const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    const userId = req.user ? req.user.id : null;
    const result = await authService.logout(token, userId);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const revokeToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    const userId = req.user ? req.user.id : (req.body.userId || null);
    await authService.revoke_token(token, userId);
    res.status(200).json({
      success: true,
      message: 'Token revocado e ingresado en backlist con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  revokeToken,
};
