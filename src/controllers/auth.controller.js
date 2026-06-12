import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.utils.js";

// Registra un nuevo usuario.
// POST /api/v1/auth/register
export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  successResponse(res, 201, "Usuario registrado correctamente.", user);
});

// Inicia sesión y devuelve un token JWT.
// POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  successResponse(res, 200, "Inicio de sesión exitoso.", data);
});

// Devuelve los datos del usuario autenticado
// GET /api/v1/auth/me  — ruta protegida
export const getMe = asyncHandler(async (req, res) => {
  // req.user fue seteado por el middleware protect con los datos del token
  successResponse(res, 200, "Usuario autenticado.", req.user);
});
