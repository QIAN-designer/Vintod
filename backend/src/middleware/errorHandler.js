// Middleware centralizado de gestión de errores
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  // Manejo de errores de integridad referencial de Prisma
  if (err.code === 'P2003') {
    // Foreign key constraint failed
    statusCode = 400;
    message = 'Error de integridad referencial: La entidad relacionada no existe o restringe la operación.';
  } else if (err.code === 'P2002') {
    // Unique constraint violation
    statusCode = 409;
    const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : err.meta?.target || 'campo único';
    message = `Violación de unicidad: Ya existe un registro con el mismo valor en ${target}.`;
  } else if (err.code === 'P2025') {
    // Record not found
    statusCode = 404;
    message = 'El registro solicitado no existe o ya ha sido eliminado.';
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
