import sequelize from "../config/database.js";

import User from "./User.js";
import Product from "./Product.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";


// RELACIONES ENTRE MODELOS


// 1:N — Un usuario puede tener muchos carritos (uno activo, otros completados)
User.hasMany(Cart, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "carts",
});

// 1:1 — Un carrito pertenece a un usuario
Cart.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
});

// 1:N — Un carrito puede tener muchos ítems
Cart.hasMany(CartItem, {
  foreignKey: {
    name: "cartId",
    allowNull: false,
  },
  as: "items",
});

// 1:1 — Un ítem pertenece a un carrito
CartItem.belongsTo(Cart, {
  foreignKey: {
    name: "cartId",
    allowNull: false,
  },
  as: "cart",
});

// 1:N — Un producto puede aparecer en muchos ítems de carrito
Product.hasMany(CartItem, {
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
  as: "cartItems",
});

// 1:1 — Un ítem referencia a un producto
CartItem.belongsTo(Product, {
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
  as: "product",
});

export { sequelize, User, Product, Cart, CartItem };
