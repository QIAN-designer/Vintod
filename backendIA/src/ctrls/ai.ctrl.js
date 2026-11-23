const aiService = require('../services/ai.service');

const askProductQuestion = async (req, res, next) => {
  try {
    const result = await aiService.askAboutProduct(req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    service: 'vintod-backend-ia',
    provider: 'groq',
    status: 'ok'
  });
};

module.exports = {
  askProductQuestion,
  healthCheck
};
