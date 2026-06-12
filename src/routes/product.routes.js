import { Router } from "express";

import * as productController from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas las rutas de productos requieren autenticación
// La tienda solo vende a usuarios registrados

// GET /api/v1/products — lista todos los productos
router.get("/", protect, productController.getAllProducts);

// GET /api/v1/products/category/:category — filtra por categoría
router.get("/category/:category", protect, productController.getProductsByCategory);

// GET /api/v1/products/:id — detalle de un producto
router.get("/:id", protect, productController.getProductById);

export default router;
