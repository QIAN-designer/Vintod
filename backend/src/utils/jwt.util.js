const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vintod_default_jwt_secret_dev_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (JWT_SECRET + '_refresh');

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

/**
 * Genera un Access Token de corta duración (ej. 15 minutos)
 * @param {Object} payload - User claims (userId, email, role)
 * @returns {string} Signed JWT token
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    jwtid: crypto.randomUUID(),
  });
};

/**
 * Genera un Refresh Token de larga duración (ej. 7 días)
 * @param {Object} payload - Claims mínimos (userId)
 * @returns {string} Signed JWT token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    jwtid: crypto.randomUUID(),
  });
};

/**
 * Compatibilidad con generateToken anterior (actúa como access token)
 */
const generateToken = (payload) => {
  return generateAccessToken(payload);
};

/**
 * Verifica la firma y expiración del Access Token
 * @param {string} token
 * @returns {Object} Decoded payload
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const verifyToken = (token) => {
  return verifyAccessToken(token);
};

/**
 * Verifica la firma y expiración del Refresh Token
 * @param {string} token
 * @returns {Object} Decoded payload
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

/**
 * Decodifica un token sin verificar firma
 * @param {string} token
 * @returns {Object|null} Decoded payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Calcula la fecha de expiración en base al token decodificado o días por defecto
 * @param {string} token
 * @param {number} defaultDays
 * @returns {Date}
 */
const getTokenExpirationDate = (token, defaultDays = 7) => {
  const decoded = decodeToken(token);
  if (decoded && decoded.exp) {
    return new Date(decoded.exp * 1000);
  }
  const date = new Date();
  date.setDate(date.getDate() + defaultDays);
  return date;
};

module.exports = {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  getTokenExpirationDate,
};
