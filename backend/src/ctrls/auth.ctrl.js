const authService = require('../services/auth.service');

// Opciones de configuración segura para cookies httpOnly
const ACCESS_COOKIE_NAME = 'access_token';
const COOKIE_ACCESS_NAME = 'cookie_access';
const REFRESH_COOKIE_NAME = 'refresh_token';
const LEGACY_COOKIE_NAME = 'jwt_token';

const isProduction = process.env.NODE_ENV === 'production';

const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 15 * 60 * 1000, // 15 minutos
  path: '/',
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  path: '/',
};

/**
 * Helper para setear cookies de tokens en la respuesta
 */
const setAuthCookies = (res, accessToken, refreshToken) => {
  if (accessToken) {
    res.cookie(ACCESS_COOKIE_NAME, accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie(COOKIE_ACCESS_NAME, accessToken, ACCESS_COOKIE_OPTIONS);
    // Para compatibilidad retroactiva con cualquier consumidor que lea jwt_token
    res.cookie(LEGACY_COOKIE_NAME, accessToken, ACCESS_COOKIE_OPTIONS);
  }
  if (refreshToken) {
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);
  }
};

/**
 * Helper para limpiar todas las cookies de autenticación
 */
const clearAuthCookies = (res) => {
  res.clearCookie(ACCESS_COOKIE_NAME, { ...ACCESS_COOKIE_OPTIONS, maxAge: 0 });
  res.clearCookie(COOKIE_ACCESS_NAME, { ...ACCESS_COOKIE_OPTIONS, maxAge: 0 });
  res.clearCookie(REFRESH_COOKIE_NAME, { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });
  res.clearCookie(LEGACY_COOKIE_NAME, { ...ACCESS_COOKIE_OPTIONS, maxAge: 0 });
};

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    setAuthCookies(res, result.accessToken, result.refreshToken);

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

    setAuthCookies(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE_NAME] ||
      req.body?.refreshToken ||
      req.headers['x-refresh-token'];

    const result = await authService.refreshSession(refreshToken);

    setAuthCookies(res, result.accessToken, result.refreshToken);

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
    const accessToken =
      req.cookies?.[ACCESS_COOKIE_NAME] ||
      req.cookies?.[COOKIE_ACCESS_NAME] ||
      req.cookies?.[LEGACY_COOKIE_NAME] ||
      req.body?.accessToken ||
      req.token ||
      (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    const refreshToken =
      req.cookies?.[REFRESH_COOKIE_NAME] ||
      req.body?.refreshToken ||
      req.headers['x-refresh-token'] ||
      null;

    const userId = req.user ? req.user.id : (req.body?.userId || null);

    await authService.logout({ accessToken, refreshToken, userId });

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente y cookies eliminadas.',
    });
  } catch (error) {
    next(error);
  }
};

const revokeToken = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies?.[ACCESS_COOKIE_NAME] ||
      req.cookies?.[LEGACY_COOKIE_NAME] ||
      req.token ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    const userId = req.user ? req.user.id : (req.body.userId || null);
    await authService.revoke_token(token, userId);

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      message: 'Token revocado e ingresado en backlist con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  LEGACY_COOKIE_NAME,
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_OPTIONS,
  register,
  login,
  refresh,
  getMe,
  logout,
  revokeToken,
};
