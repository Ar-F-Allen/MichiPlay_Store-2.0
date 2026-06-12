import ApiError from "../utils/ApiError.js";

// Middleware genérico para ejecutar validaciones manuales.
// Recibe una función de validación que debe devolver un array de errores.
// Si hay errores, responde con 400 antes de que llegue al controlador.

export const validate = (validationFunction) => {
  return (req, res, next) => {
    const errors = validationFunction(req);

    if (errors.length > 0) {
      throw new ApiError(400, "Error de validación.", errors);
    }

    next();
  };
};

// En Express, req trae la información de la petición, res sirve para responder, y next permite continuar al siguiente paso.
// Los middlewares usan esos tres porque están entre la ruta y el controller.
