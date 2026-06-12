// Sincroniza los modelos con la base de datos (crea las tablas si no existen).
// Se ejecuta con: npm run db:sync
import { sequelize } from "../src/models/index.js";

const syncDatabase = async () => {
  try {
    // alter: true actualiza las tablas si los modelos cambiaron, sin borrar los datos
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error(`Error al sincronizar: ${error.message}`);
    throw error;
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
