import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.utils.js";

// Middleware para proteger rutas privadas.
// Espera recibir en la cabecera: Authorization: Bearer TOKEN
// Si el token es válido, guarda los datos del usuario en req.user y continúa.
// Si no, responde con 401 antes de que llegue al controlador.

export const protect = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw new ApiError(401, "Token no proporcionado.");
  }

  // El formato esperado es "Bearer <token>"
  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new ApiError(401, "Formato de token inválido.");
  }

  try {
    const decoded = verifyToken(token);

    // Guardamos los datos del usuario autenticado en req.user.
    // Así los controladores y servicios pueden saber quién hace la petición.
    req.user = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Token inválido o expirado.");
  }
};

// En Express, req trae la información de la petición, res sirve para responder, y next permite continuar al siguiente paso.
// Los middlewares usan esos tres porque están entre la ruta y el controller.
