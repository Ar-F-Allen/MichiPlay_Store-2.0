// Valida los datos para operaciones del carrito

export const validateAddToCart = (req) => {
  const { productId, quantity } = req.body;
  const errors = [];

  if (!productId || productId.trim() === "") {
    errors.push("El id del producto es obligatorio.");
  }

  if (!quantity || isNaN(quantity) || Number(quantity) < 1) {
    errors.push("La cantidad debe ser un número mayor a 0.");
  }

  return errors;
};

export const validateUpdateQuantity = (req) => {
  const { quantity } = req.body;
  const errors = [];

  if (quantity === undefined || isNaN(quantity) || Number(quantity) < 1) {
    errors.push("La cantidad debe ser un número mayor a 0.");
  }

  return errors;
};
