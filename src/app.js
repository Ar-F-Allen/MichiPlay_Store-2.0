import express from "express";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import webRoutes from "./routes/web.routes.js";
import apiRoutes from "./routes/index.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";

const app = express();

// __dirname no existe en módulos ES, lo recreamos con fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permitimos peticiones desde el frontend (CORS)
app.use(cors());

// Middleware para manejar subida de archivos (imágenes)
app.use(
  fileUpload({
    // Límite de 2MB por archivo
    limits: { fileSize: 2 * 1024 * 1024 },
    // Si el tamaño excede el límite, se rechaza la petición
    abortOnLimit: true,
  })
);

// Carpeta pública para archivos estáticos (CSS, JS del frontend, imágenes)
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Ruta específica para acceder a las imágenes subidas
// Ejemplo: /uploads/products/snack-gato.png
app.use("/uploads", express.static(path.join(publicPath, "uploads")));

// Rutas del frontend (vistas Handlebars)
app.use("/", webRoutes);

// Rutas de la API REST
app.use("/api/v1", apiRoutes);

// Si ninguna ruta coincide, respondemos con 404
app.use((req, res, next) => {
  next(new ApiError(404, "Ruta no encontrada"));
});

// Middleware global de manejo de errores (siempre al final)
app.use(errorMiddleware);

export default app;
