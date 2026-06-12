import { Router } from "express";

import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateRegister, validateLogin } from "../validations/auth.validation.js";

const router = Router();

// POST /api/v1/auth/register — registro público
router.post("/register", validate(validateRegister), authController.register);

// POST /api/v1/auth/login — login público
router.post("/login", validate(validateLogin), authController.login);

// GET /api/v1/auth/me — datos del usuario autenticado (ruta protegida)
router.get("/me", protect, authController.getMe);

export default router;
