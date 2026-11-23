const express = require('express');
const router = express.Router();

const aiCtrl = require('../ctrls/ai.ctrl');
const validate = require('../middlewares/validate.middleware');
const { askProductSchema } = require('../schemas/ai.schemas');

// Healthcheck del servicio de IA
router.get('/health', aiCtrl.healthCheck);

// Consulta con Groq sobre un producto en ShopDetails
router.post('/ask', validate({ body: askProductSchema }), aiCtrl.askProductQuestion);

module.exports = router;
