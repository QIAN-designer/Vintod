const { prisma } = require('../config/db');

const findByUserId = async (userId) => {
  return await prisma.profile.findUnique({
    where: { userId },
  });
};

const findByUsername = async (username) => {
  return await prisma.profile.findUnique({
    where: { username },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          isActive: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });
};

const updateByUserId = async (userId, data) => {
  return await prisma.profile.update({
    where: { userId },
    data,
  });
};

const deleteByUserId = async (userId) => {
  return await prisma.profile.delete({
    where: { userId },
  });
};

module.exports = {
  findByUserId,
  findByUsername,
  updateByUserId,
  deleteByUserId,
};

