// Punto de entrada del servidor
// Importamos la app de Express y la configuración del puerto y base de datos
import app from "./src/app.js";
import { PORT } from "./src/config/env.js";
import { testConnection } from "./src/config/database.js";

const startServer = async () => {
  try {
    // Verificamos que la conexión a PostgreSQL funcione antes de levantar el servidor
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Servidor MichiPlay_Store API ejecutándose en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(`No se pudo iniciar el servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
