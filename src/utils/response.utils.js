// Respuesta exitosa estándar.
// Usar una función común evita repetir el mismo formato en todos los controladores.

export const successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    ok: true,
    message,
    data,
  });
};
