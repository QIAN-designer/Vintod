const AppError = require('../services/utils/appError');

const validate = (schema) => (req, res, next) => {
  try {
    if (schema.params) {
      req.params = schema.params.parse(req.params);
    }
    if (schema.query) {
      req.query = schema.query.parse(req.query);
    }
    if (schema.body) {
      req.body = schema.body.parse(req.body);
    }
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const issues = error.issues || error.errors || [];
      const messages = issues.map(err => {
        const path = (err.path || []).join('.');
        return path ? `${path}: ${err.message}` : err.message;
      }).join(', ');
      return next(new AppError(`Datos inválidos: ${messages}`, 400));
    }
    next(error);
  }
};

module.exports = validate;
