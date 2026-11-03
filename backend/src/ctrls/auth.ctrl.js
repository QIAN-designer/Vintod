const authService = require('../services/auth.service');

// Opciones de configuración segura para la cookie JWT (httpOnly)
const COOKIE_NAME = 'jwt_token';
const COOKIE_OPTIONS = {
  httpOnly: true, // Inaccesible desde JavaScript en el navegador (protección XSS)
  secure: process.env.NODE_ENV === 'production', // true solo en producción HTTPS
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Permite envío de cookies entre dominios/puertos
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días (en milisegundos)
  path: '/',
};

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    // Guardar token en cookie httpOnly
    if (result.token) {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
    }

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

    // Guardar token en cookie httpOnly
    if (result.token) {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
    }

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
    const token =
      req.cookies?.[COOKIE_NAME] ||
      req.token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    const userId = req.user ? req.user.id : null;

    if (token) {
      await authService.logout(token, userId);
    }

    // Limpiar cookie httpOnly del navegador
    res.clearCookie(COOKIE_NAME, {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente y cookie eliminada.',
    });
  } catch (error) {
    next(error);
  }
};

const revokeToken = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies?.[COOKIE_NAME] ||
      req.token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    const userId = req.user ? req.user.id : (req.body.userId || null);
    await authService.revoke_token(token, userId);

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      message: 'Token revocado e ingresado en backlist con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  COOKIE_NAME,
  COOKIE_OPTIONS,
  register,
  login,
  getMe,
  logout,
  revokeToken,
};
