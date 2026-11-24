const { prisma } = require('../config/db');

/**
 * Guarda un nuevo refresh token en la base de datos
 * @param {Object} data - { token, userId, expiresAt }
 */
const createRefreshToken = async ({ token, userId, expiresAt }) => {
  return await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
      revokedAt: null,
    },
  });
};

/**
 * Busca un refresh token por su cadena y verifica que no esté revocado ni expirado
 * @param {string} token
 */
const findValidRefreshToken = async (token) => {
  return await prisma.refreshToken.findFirst({
    where: {
      token,
      OR: [
        { revokedAt: null },
        { revokedAt: { isSet: false } },
      ],
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: {
        include: {
          role: true,
          profile: true,
        },
      },
    },
  });
};

/**
 * Busca cualquier refresh token por su cadena
 * @param {string} token
 */
const findByToken = async (token) => {
  return await prisma.refreshToken.findUnique({
    where: { token },
  });
};

/**
 * Revoca un refresh token marcando la fecha revokedAt
 * @param {string} token
 */
const revokeRefreshToken = async (token) => {
  return await prisma.refreshToken.updateMany({
    where: { token },
    data: {
      revokedAt: new Date(),
    },
  });
};

/**
 * Revoca todos los refresh tokens de un usuario (ej. logout en todos los dispositivos o cambio de password)
 * @param {string} userId
 */
const revokeAllUserTokens = async (userId) => {
  return await prisma.refreshToken.updateMany({
    where: {
      userId,
      OR: [
        { revokedAt: null },
        { revokedAt: { isSet: false } },
      ],
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

/**
 * Elimina físicamente un refresh token de la base de datos
 * @param {string} token
 */
const deleteRefreshToken = async (token) => {
  return await prisma.refreshToken.deleteMany({
    where: { token },
  });
};

/**
 * Elimina físicamente todos los refresh tokens de un usuario
 * @param {string} userId
 */
const deleteAllUserTokens = async (userId) => {
  return await prisma.refreshToken.deleteMany({
    where: { userId },
  });
};

/**
 * Elimina tokens expirados físicamente de la base de datos
 */
const cleanExpiredTokens = async () => {
  return await prisma.refreshToken.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        {
          AND: [
            { revokedAt: { isSet: true } },
            { revokedAt: { not: null } },
          ],
        },
      ],
    },
  });
};

module.exports = {
  createRefreshToken,
  findValidRefreshToken,
  findByToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  deleteRefreshToken,
  deleteAllUserTokens,
  cleanExpiredTokens,
};
