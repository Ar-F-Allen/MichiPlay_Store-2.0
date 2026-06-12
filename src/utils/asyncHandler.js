// Manejador de controladores asíncronos
// Con asyncHandler evitamos incluir try/catch en cada controlador.
// Si algo falla en el controlador, el error se envía directo al middleware de errores.

export const asyncHandler = (controllerFunction) => {
  return (req, res, next) => {
    Promise.resolve(controllerFunction(req, res, next)).catch(next);
  };
};
