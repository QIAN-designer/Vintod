const argon2 = require('argon2');

/**
 * Hashes a plaintext password using Argon2id.
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
};

/**
 * Verifies a plaintext password against an Argon2 hash.
 * @param {string} hash - Stored hash
 * @param {string} password - Candidate plain text password
 * @returns {Promise<boolean>}
 */
const verifyPassword = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    return false;
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};

