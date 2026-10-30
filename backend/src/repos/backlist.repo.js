const { prisma } = require('../config/db');

/**
 * Añade un token a la lista negra (backlist)
 * @param {string} token - Token JWT a revocar
 * @param {string|null} userId - ID del usuario asociado (opcional)
 * @param {Date|null} expiresAt - Fecha de expiración del token (opcional, para limpieza o TTL)
 */
const addToBacklist = async ({ token, userId = null, expiresAt = null }) => {
  return await prisma.backlist.upsert({
    where: { token },
    update: {},
    create: {
      token,
      userId,
      expiresAt,
    },
  });
};

/**
 * Comprueba si un token está en la lista negra (backlist)
 * @param {string} token - Token JWT
 * @returns {Promise<boolean>}
 */
const isTokenInBacklist = async (token) => {
  const record = await prisma.backlist.findUnique({
    where: { token },
  });
  return !!record;
};

/**
 * Elimina tokens expirados de la lista negra para liberar espacio (opcional / mantenimiento)
 */
const cleanExpiredTokens = async () => {
  return await prisma.backlist.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};

module.exports = {
  addToBacklist,
  isTokenInBacklist,
  cleanExpiredTokens,
};

