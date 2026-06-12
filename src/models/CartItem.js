import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modelo de ítem dentro del carrito
// Representa cada producto agregado al carrito con su cantidad
// Guardamos el precio al momento de agregar para que no cambie si el producto se actualiza
const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Referencia al carrito al que pertenece este ítem
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // Referencia al producto
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // Cantidad de unidades del producto en el carrito
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    // Precio unitario al momento de agregar al carrito
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "cart_items",
    timestamps: true,
  }
);

export default CartItem;
