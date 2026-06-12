import * as cartService from "../services/cart.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.utils.js";

// Devuelve el carrito activo del usuario autenticado.
// GET /api/v1/cart  — ruta protegida
export const getCart = asyncHandler(async (req, res) => {
  // req.user.id viene del token JWT decodificado por el middleware protect
  const cart = await cartService.getCart(req.user.id);

  successResponse(res, 200, "Carrito obtenido correctamente.", cart);
});

// Agrega un producto al carrito del usuario.
// POST /api/v1/cart/items  — ruta protegida
export const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user.id, req.body);

  successResponse(res, 200, "Producto agregado al carrito.", cart);
});

// Actualiza la cantidad de un ítem del carrito.
// PUT /api/v1/cart/items/:itemId  — ruta protegida
export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItem(req.user.id, req.params.itemId, req.body);

  successResponse(res, 200, "Carrito actualizado.", cart);
});

// Elimina un ítem del carrito.
// DELETE /api/v1/cart/items/:itemId  — ruta protegida
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await cartService.removeFromCart(req.user.id, req.params.itemId);

  successResponse(res, 200, "Producto eliminado del carrito.", cart);
});

// Vacía completamente el carrito.
// DELETE /api/v1/cart  — ruta protegida
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);

  successResponse(res, 200, "Carrito vaciado.", cart);
});

// Finaliza la compra.
// POST /api/v1/cart/checkout  — ruta protegida
export const checkout = asyncHandler(async (req, res) => {
  const result = await cartService.checkout(req.user.id);

  successResponse(res, 200, result.message, result);
});
