// Script de inicialización completa: crea la base de datos, sincroniza tablas e inserta datos.
// Se ejecuta con: npm run db:init
import pg from "pg";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "../src/config/env.js";
import { sequelize, User, Product, Cart } from "../src/models/index.js";
import { hashPassword } from "../src/utils/password.utils.js";

const { Client } = pg;

const initDatabase = async () => {
  // PASO 1: Crear la base de datos si no existe
  const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: "postgres",
  });

  try {
    await client.connect();
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✓ Base de datos ${DB_NAME} creada.`);
    } else {
      console.log(`✓ Base de datos ${DB_NAME} ya existe.`);
    }
  } finally {
    await client.end();
  }

  // PASO 2: Sincronizar modelos (crear tablas)
  await sequelize.sync({ alter: true });
  console.log("✓ Tablas sincronizadas.");

  // PASO 3: Insertar datos de prueba
  const usersCount = await User.count();
  if (usersCount > 0) {
    console.log("✓ Seed omitido (ya hay datos).");
  } else {
    const password = await hashPassword("123456");

    const userOne = await User.create({
      fullName: "María González",
      email: "maria@michiplay.cl",
      phone: "+56912345678",
      address: "Av. Providencia 123, Santiago",
      password,
    });

    const userTwo = await User.create({
      fullName: "Carlos Ruiz",
      email: "carlos@michiplay.cl",
      phone: "+56987654321",
      address: "Calle Las Flores 456, Santiago",
      password,
    });

    await Cart.create({ userId: userOne.id, status: "active" });
    await Cart.create({ userId: userTwo.id, status: "active" });

    await Product.bulkCreate([
      { name: "Royal Canin Indoor Adult 2kg", description: "Alimento balanceado para gatos adultos de interior. Controla el peso y reduce las bolas de pelo.", price: 18990, stock: 50, category: "alimento", image: "https://loremflickr.com/400/300/cat,food,kibble?lock=1" },
      { name: "Whiskas Adulto Pollo y Pavo 3kg", description: "Croquetas con Omega 3 y 6 para un pelaje brillante.", price: 12990, stock: 80, category: "alimento", image: "https://loremflickr.com/400/300/cat,eating,bowl?lock=2" },
      { name: "Snacks Dreamies Salmón 60g", description: "Premios irresistibles con centro cremoso de salmón.", price: 2990, stock: 120, category: "alimento", image: "https://loremflickr.com/400/300/cat,treat,snack?lock=3" },
      { name: "Rascador Torre Sisal con Cama", description: "Rascador 70cm con sisal natural y plataforma acolchada.", price: 34990, stock: 20, category: "juguete", image: "https://loremflickr.com/400/300/cat,scratching,post?lock=4" },
      { name: "Varita Plumas Interactiva", description: "Estimula el instinto cazador con plumas y cascabel.", price: 4990, stock: 60, category: "juguete", image: "https://loremflickr.com/400/300/cat,playing,feather?lock=5" },
      { name: "Arena Sanitaria Aglomerante 10L", description: "Ultra-aglomerante, control de olores 30 días, baja en polvo.", price: 9990, stock: 70, category: "higiene", image: "https://loremflickr.com/400/300/cat,litter,box?lock=7" },
      { name: "Shampoo Seco para Gatos 150ml", description: "Limpieza sin agua con aloe vera y aceite de argán.", price: 7490, stock: 45, category: "higiene", image: "https://loremflickr.com/400/300/cat,bath,grooming?lock=8" },
      { name: "Cepillo Masajeador FURminator", description: "Reduce la formación de bolas de pelo hasta en un 90%.", price: 14990, stock: 35, category: "higiene", image: "https://loremflickr.com/400/300/cat,brush,grooming?lock=9" },
      { name: "Comedero Automático 2L", description: "Dispensador programable con 4 horarios y pantalla LCD.", price: 42990, stock: 15, category: "accesorio", image: "https://loremflickr.com/400/300/cat,feeder,bowl?lock=10" },
      { name: "Bebedero Fuente Silencioso 2L", description: "Filtro de carbón activo que atrae a los gatos a beber más.", price: 29990, stock: 25, category: "accesorio", image: "https://loremflickr.com/400/300/cat,drinking,water?lock=11" },
      { name: "Cama Cueva Felpa Antiestrés", description: "Cama tipo cueva ultra suave que da seguridad y calidez.", price: 24990, stock: 30, category: "cama", image: "https://loremflickr.com/400/300/cat,sleeping,bed?lock=12" },
      { name: "Hamaca para Ventana con Ventosas", description: "Hamaca asoleadora para ventana, soporta hasta 10kg.", price: 19990, stock: 40, category: "cama", image: "https://loremflickr.com/400/300/cat,window,sunshine?lock=13" },
    ]);

    console.log("✓ Datos de prueba insertados.");
    console.log("  Usuario 1: maria@michiplay.cl / 123456");
    console.log("  Usuario 2: carlos@michiplay.cl / 123456");
  }

  await sequelize.close();
  console.log("\n😺 MichiPlay_Store lista para usar.");
};

initDatabase().catch((error) => {
  console.error("Error en init:", error.message);
  process.exit(1);
});
