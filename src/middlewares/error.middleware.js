// Middleware global de manejo de errores.
// Captura cualquier error que haya pasado por next(error) en la aplicación.
// Responde con un formato de error consistente para que el frontend siempre reciba lo mismo.

const errorMiddleware = (err, req, res, next) => {
  // Si el error tiene un statusCode definido (ApiError), lo usamos; si no, es un error 500
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    ok: false,
    message,
    // Solo mostramos los errores de validación si existen
    errors: err.errors || null,
  });
};

export default errorMiddleware;
