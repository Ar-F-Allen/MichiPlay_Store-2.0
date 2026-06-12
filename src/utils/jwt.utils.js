import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

// Genera un token JWT.
// En el payload guardamos información mínima: id y email del usuario.
// No guardamos la contraseña ni datos sensibles en el token.
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Verifica si un token es válido y no ha expirado.
// Si no es válido, lanza un error que capturamos en el middleware de autenticación.
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
