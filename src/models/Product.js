import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Modelo de Producto
// Representa los productos disponibles en la tienda de gatos
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // Categoría del producto: alimento, juguete, accesorio, higiene, etc.
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    // Imagen del producto (ruta relativa a /uploads/products/)
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Si el producto está activo o fue desactivado por el admin
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
