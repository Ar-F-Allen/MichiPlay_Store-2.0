import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modelo de Carrito
// Cada usuario tiene un único carrito activo a la vez
// Cuando se completa una orden, el carrito cambia a estado "completed"
const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Referencia al usuario dueño del carrito (foreignKey se define en index.js)
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    // Estado del carrito: "active" mientras el usuario está comprando, "completed" cuando paga
    status: {
      type: DataTypes.ENUM("active", "completed"),
      defaultValue: "active",
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);

export default Cart;
