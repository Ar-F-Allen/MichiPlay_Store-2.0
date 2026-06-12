import { Router } from "express";

import * as cartController from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateAddToCart, validateUpdateQuantity } from "../validations/cart.validation.js";

const router = Router();

// Todas las rutas del carrito requieren autenticación
// Cada usuario solo puede ver y modificar su propio carrito

// GET /api/v1/cart — ver el carrito activo del usuario
router.get("/", protect, cartController.getCart);

// POST /api/v1/cart/checkout — finalizar la compra
router.post("/checkout", protect, cartController.checkout);

// POST /api/v1/cart/items — agregar un producto al carrito
router.post("/items", protect, validate(validateAddToCart), cartController.addToCart);

// PUT /api/v1/cart/items/:itemId — actualizar cantidad de un ítem
router.put("/items/:itemId", protect, validate(validateUpdateQuantity), cartController.updateCartItem);

// DELETE /api/v1/cart/items/:itemId — eliminar un producto del carrito
router.delete("/items/:itemId", protect, cartController.removeFromCart);

// DELETE /api/v1/cart — vaciar el carrito completo
router.delete("/", protect, cartController.clearCart);

export default router;
