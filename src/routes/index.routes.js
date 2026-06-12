import { Router } from "express";

import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";

const router = Router();

// Ruta de health check para verificar que el servidor está activo
router.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "Servidor activo",
    service: "MichiPlay_Store",
  });
});

/*
  Rutas finales disponibles:

  AUTH:
    POST  /api/v1/auth/register
    POST  /api/v1/auth/login
    GET   /api/v1/auth/me

  PRODUCTS (requieren JWT):
    GET   /api/v1/products
    GET   /api/v1/products/:id
    GET   /api/v1/products/category/:category

  CART (requieren JWT):
    GET   /api/v1/cart
    POST  /api/v1/cart/items
    PUT   /api/v1/cart/items/:itemId
    DELETE /api/v1/cart/items/:itemId
    DELETE /api/v1/cart
    POST  /api/v1/cart/checkout
*/

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

export default router;
