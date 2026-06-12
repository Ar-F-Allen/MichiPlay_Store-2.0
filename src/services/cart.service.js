import ApiError from "../utils/ApiError.js";
import { Cart, CartItem, Product, sequelize } from "../models/index.js";

// Obtiene o crea el carrito activo del usuario autenticado.
// Cada usuario tiene un solo carrito activo a la vez.
const getOrCreateActiveCart = async (userId, transaction = null) => {
  let cart = await Cart.findOne({
    where: { userId, status: "active" },
    transaction,
  });

  // Si no tiene carrito activo, lo creamos
  if (!cart) {
    cart = await Cart.create({ userId, status: "active" }, { transaction });
  }

  return cart;
};

// Devuelve el carrito activo del usuario con todos sus productos.
export const getCart = async (userId) => {
  const cart = await getOrCreateActiveCart(userId);

  // Incluimos los ítems con la información del producto asociado
  const cartWithItems = await Cart.findOne({
    where: { id: cart.id },
    include: [
      {
        association: "items",
        include: [
          {
            association: "product",
            // Solo mostramos los campos necesarios del producto
            attributes: ["id", "name", "price", "image", "category", "stock"],
          },
        ],
      },
    ],
  });

  // Calculamos el total del carrito
  const total = cartWithItems.items.reduce((sum, item) => {
    return sum + Number(item.unitPrice) * item.quantity;
  }, 0);

  return {
    id: cartWithItems.id,
    status: cartWithItems.status,
    items: cartWithItems.items,
    total: total.toFixed(2),
    itemCount: cartWithItems.items.length,
  };
};

// Agrega un producto al carrito del usuario.
// Si el producto ya está en el carrito, suma la cantidad.
export const addToCart = async (userId, { productId, quantity }) => {
  // Verificamos que el producto existe y tiene stock
  const product = await Product.findOne({
    where: { id: productId, isActive: true },
  });

  if (!product) {
    throw new ApiError(404, "Producto no encontrado.");
  }

  if (product.stock < quantity) {
    throw new ApiError(400, `Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`);
  }

  const transaction = await sequelize.transaction();

  try {
    const cart = await getOrCreateActiveCart(userId, transaction);

    // Verificamos si el producto ya está en el carrito
    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
      transaction,
    });

    if (existingItem) {
      // Si ya existe, actualizamos la cantidad sumando
      const newQuantity = existingItem.quantity + Number(quantity);

      if (product.stock < newQuantity) {
        throw new ApiError(400, `Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`);
      }

      await existingItem.update({ quantity: newQuantity }, { transaction });
    } else {
      // Si no existe, creamos un nuevo ítem con el precio actual del producto
      await CartItem.create(
        {
          cartId: cart.id,
          productId,
          quantity: Number(quantity),
          unitPrice: product.price,
        },
        { transaction }
      );
    }

    await transaction.commit();

    // Devolvemos el carrito actualizado
    return await getCart(userId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Actualiza la cantidad de un ítem en el carrito.
export const updateCartItem = async (userId, cartItemId, { quantity }) => {
  const transaction = await sequelize.transaction();

  try {
    const cart = await getOrCreateActiveCart(userId, transaction);

    // Verificamos que el ítem pertenece al carrito del usuario
    const item = await CartItem.findOne({
      where: { id: cartItemId, cartId: cart.id },
      include: [{ association: "product" }],
      transaction,
    });

    if (!item) {
      throw new ApiError(404, "Ítem no encontrado en el carrito.");
    }

    if (item.product.stock < quantity) {
      throw new ApiError(400, `Stock insuficiente. Solo hay ${item.product.stock} unidades disponibles.`);
    }

    await item.update({ quantity: Number(quantity) }, { transaction });

    await transaction.commit();

    return await getCart(userId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Elimina un ítem del carrito.
export const removeFromCart = async (userId, cartItemId) => {
  const cart = await getOrCreateActiveCart(userId);

  // Verificamos que el ítem pertenece al carrito del usuario autenticado
  const item = await CartItem.findOne({
    where: { id: cartItemId, cartId: cart.id },
  });

  if (!item) {
    throw new ApiError(404, "Ítem no encontrado en el carrito.");
  }

  await item.destroy();

  return await getCart(userId);
};

// Vacía completamente el carrito del usuario.
export const clearCart = async (userId) => {
  const cart = await getOrCreateActiveCart(userId);

  // Eliminamos todos los ítems del carrito
  await CartItem.destroy({
    where: { cartId: cart.id },
  });

  return await getCart(userId);
};

// Finaliza la compra: cambia el estado del carrito a "completed" y crea uno nuevo vacío.
export const checkout = async (userId) => {
  const transaction = await sequelize.transaction();

  try {
    const cart = await Cart.findOne({
      where: { userId, status: "active" },
      include: [{ association: "items" }],
      transaction,
    });

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "El carrito está vacío.");
    }

    // Marcamos el carrito como completado (la compra se realizó)
    await cart.update({ status: "completed" }, { transaction });

    // Creamos un carrito nuevo vacío para el próximo pedido
    await Cart.create({ userId, status: "active" }, { transaction });

    await transaction.commit();

    return {
      message: "¡Compra realizada con éxito!",
      orderId: cart.id,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
