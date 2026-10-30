const express = require('express');
const router = express.Router();

const authCtrl = require('../ctrls/auth.ctrl');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../schemas/auth.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');

// Registro atómico con Profile
router.post('/register', validate(registerSchema), authCtrl.register);

// Login con email + password
router.post('/login', validate(loginSchema), authCtrl.login);

// Sesión actual validada contra BD y JWT
router.get('/me', authenticateJWT, authCtrl.getMe);

// Logout: Revoca el token actual guardándolo en la tabla backlist
router.post('/logout', authenticateJWT, authCtrl.logout);

// Endpoint explícito para revocar tokens (revoke_token)
router.post('/revoke-token', authenticateJWT, authCtrl.revokeToken);

module.exports = router;
