// Inserta datos iniciales de prueba en la base de datos.
// Se ejecuta con: npm run db:seed
import { sequelize, User, Product, Cart } from "../src/models/index.js";
import { hashPassword } from "../src/utils/password.utils.js";

const seedDatabase = async () => {
  try {
    const usersCount = await User.count();

    if (usersCount > 0) {
      console.log("La base de datos ya tiene datos. Seed omitido.");
      return;
    }

    const password = await hashPassword("123456");

    // Creamos usuarios de prueba
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

    // Productos 
    await Product.bulkCreate([
      {
        name: "Royal Canin Indoor Adult 2kg",
        description: "Alimento balanceado para gatos adultos que viven en interior. Controla el peso y reduce las bolas de pelo.",
        price: 18990,
        stock: 50,
        category: "alimento",
        image: "https://loremflickr.com/400/300/cat,food,kibble?lock=1",
      },
      {
        name: "Whiskas Adulto Pollo y Pavo 3kg",
        description: "Croquetas con sabor a pollo y pavo. Enriquecidas con Omega 3 y 6 para un pelaje brillante.",
        price: 12990,
        stock: 80,
        category: "alimento",
        image: "https://loremflickr.com/400/300/cat,eating,bowl?lock=2",
      },
      {
        name: "Snacks Dreamies Salmón 60g",
        description: "Premios irresistibles para tu gato. Con centro cremoso de salmón. Ideales para el entrenamiento.",
        price: 2990,
        stock: 120,
        category: "alimento",
        image: "https://loremflickr.com/400/300/cat,treat,snack?lock=3",
      },
      {
        name: "Rascador Torre Sisal con Cama",
        description: "Rascador de 70cm con postes de sisal natural, plataforma superior acolchada y juguete colgante.",
        price: 34990,
        stock: 20,
        category: "juguete",
        image: "https://loremflickr.com/400/300/cat,scratching,post?lock=4",
      },
      {
        name: "Varita Plumas Interactiva",
        description: "Juguete interactivo con plumas coloridas y cascabel. Estimula el instinto cazador de tu gato.",
        price: 4990,
        stock: 60,
        category: "juguete",
        image: "https://loremflickr.com/400/300/cat,playing,feather?lock=5",
      },
      {
        name: "Pelota Crinkle con Catnip",
        description: "Set de 3 pelotas crinkle con hierba gatera. El sonido y el olor vuelven locos a los gatos.",
        price: 3990,
        stock: 90,
        category: "juguete",
        image: "https://loremflickr.com/400/300/cat,toy,ball?lock=6",
      },
      {
        name: "Arena Sanitaria Aglomerante 10L",
        description: "Arena con tecnología ultra-aglomerante y control de olores por 30 días. Baja en polvo.",
        price: 9990,
        stock: 70,
        category: "higiene",
        image: "https://loremflickr.com/400/300/cat,litter,box?lock=7",
      },
      {
        name: "Shampoo Seco para Gatos 150ml",
        description: "Limpieza sin agua para gatos que odian el baño. Con aloe vera y aceite de argán.",
        price: 7490,
        stock: 45,
        category: "higiene",
        image: "https://loremflickr.com/400/300/cat,bath,grooming?lock=8",
      },
      {
        name: "Cepillo Masajeador FURminator",
        description: "Elimina el pelaje muerto y reduce la formación de bolas de pelo hasta en un 90%.",
        price: 14990,
        stock: 35,
        category: "higiene",
        image: "https://loremflickr.com/400/300/cat,brush,grooming?lock=9",
      },
      {
        name: "Comedero Automático 2L",
        description: "Dispensador de alimento programable con 4 horarios. Pantalla LCD y recipiente desmontable.",
        price: 42990,
        stock: 15,
        category: "accesorio",
        image: "https://loremflickr.com/400/300/cat,feeder,bowl?lock=10",
      },
      {
        name: "Bebedero Fuente Silencioso 2L",
        description: "Fuente de agua con filtro de carbón activo. Flujo constante que atrae a los gatos a beber más.",
        price: 29990,
        stock: 25,
        category: "accesorio",
        image: "https://loremflickr.com/400/300/cat,drinking,water?lock=11",
      },
      {
        name: "Cama Cueva Felpa Antiestrés",
        description: "Cama tipo cueva de felpa ultra suave. Diseño cerrado que da seguridad y calidez al gato.",
        price: 24990,
        stock: 30,
        category: "cama",
        image: "https://loremflickr.com/400/300/cat,sleeping,bed?lock=12",
      },
      {
        name: "Hamaca para Ventana con Ventosas",
        description: "Hamaca asoleadora que se adhiere a cualquier ventana. Soporta hasta 10kg. De fácil instalación.",
        price: 19990,
        stock: 40,
        category: "cama",
        image: "https://loremflickr.com/400/300/cat,window,sunshine?lock=13",
      },
    ]);

    console.log(" Datos iniciales insertados correctamente.");
    console.log("  Usuario 1: maria@michiplay.cl / 123456");
    console.log("  Usuario 2: carlos@michiplay.cl / 123456");
  } catch (error) {
    console.error("Error al insertar datos iniciales:", error.message);
    throw error;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
