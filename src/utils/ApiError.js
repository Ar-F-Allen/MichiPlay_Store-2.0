// Clase para crear errores controlados.
// Esto evita responder errores desordenados o mensajes internos del servidor al cliente.
// Todos los errores que lanzamos con esta clase llegarán al middleware de errores con formato limpio.

class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ApiError;
