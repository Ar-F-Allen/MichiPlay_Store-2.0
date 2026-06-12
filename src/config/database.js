import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "./env.js";

// sequelize para usar en todos los modelos
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  // logging: false para no ver cada query SQL en la consola
  logging: false,
});

// Función para verificar que la conexión a la base de datos está activa
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL establecida correctamente.");
  } catch (error) {
    console.error(`Error al conectar con PostgreSQL: ${error.message}`);
    throw error;
  }
};

export default sequelize;
