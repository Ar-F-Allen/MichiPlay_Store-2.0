import * as productService from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.utils.js";

// Devuelve todos los productos activos.
// GET /api/v1/products  — ruta protegida (solo usuarios autenticados)
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();

  successResponse(res, 200, "Productos obtenidos correctamente.", products);
});

// Devuelve un producto por su id.
// GET /api/v1/products/:id  — ruta protegida
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  successResponse(res, 200, "Producto obtenido correctamente.", product);
});

// Devuelve productos filtrados por categoría.
// GET /api/v1/products/category/:category  — ruta protegida
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await productService.getProductsByCategory(req.params.category);

  successResponse(res, 200, "Productos por categoría obtenidos correctamente.", products);
});
