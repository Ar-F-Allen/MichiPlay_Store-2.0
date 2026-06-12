import dotenv from "dotenv";

dotenv.config();

// Variables de entorno requeridas para que el servidor funcione
// Si alguna falta, el proceso termina con un error claro
const requiredEnvVariables = [
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

requiredEnvVariables.forEach((variableName) => {
  if (!process.env[variableName]) {
    throw new Error(`Falta la variable de entorno ${variableName}`);
  }
});

export const PORT = process.env.PORT || 3000;

export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
