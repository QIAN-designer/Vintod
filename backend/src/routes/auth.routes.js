const express = require('express');
const router = express.Router();

const authCtrl = require('../ctrls/auth.ctrl');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../schemas/auth.schemas');
const { authenticateJWT } = require('../middlewares/auth.middleware');

// Registro atómico con Profile (emite access_token y refresh_token en DB + Cookies)
router.post('/register', validate(registerSchema), authCtrl.register);

// Login con email + password (emite access_token y refresh_token en DB + Cookies)
router.post('/login', validate(loginSchema), authCtrl.login);

// Refresh de tokens: renueva access_token y rota refresh_token validando contra BBDD y Cookie
router.post('/refresh', authCtrl.refresh);

// Sesión actual validada contra BD y JWT
router.get('/me', authenticateJWT, authCtrl.getMe);

// Logout: Revoca tokens en BD (backlist + refresh_tokens) y limpia cookies
router.post('/logout', authCtrl.logout);

// Endpoint explícito para revocar tokens (revoke_token)
router.post('/revoke-token', authenticateJWT, authCtrl.revokeToken);

module.exports = router;
