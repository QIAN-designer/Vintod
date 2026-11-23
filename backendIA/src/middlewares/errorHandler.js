const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno en el servidor de IA';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[Error ${statusCode}] ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode
    }
  });
};

module.exports = errorHandler;
