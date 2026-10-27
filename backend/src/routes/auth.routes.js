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

module.exports = router;

