import ApiError from "../utils/ApiError.js";
import { Product } from "../models/index.js";

// Devuelve todos los productos activos de la tienda.
// Solo los usuarios autenticados pueden verlos (la ruta está protegida).
export const getAllProducts = async () => {
  const products = await Product.findAll({
    where: { isActive: true },
    // Ordenamos por categoría y luego por nombre para que se vea ordenado
    order: [
      ["category", "ASC"],
      ["name", "ASC"],
    ],
  });

  return products;
};

// Devuelve un producto específico por su id.
export const getProductById = async (productId) => {
  const product = await Product.findOne({
    where: { id: productId, isActive: true },
  });

  if (!product) {
    throw new ApiError(404, "Producto no encontrado.");
  }

  return product;
};

// Devuelve los productos filtrados por categoría.
export const getProductsByCategory = async (category) => {
  const products = await Product.findAll({
    where: { category, isActive: true },
    order: [["name", "ASC"]],
  });

  return products;
};
