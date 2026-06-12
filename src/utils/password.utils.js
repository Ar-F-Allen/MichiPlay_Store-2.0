import bcrypt from "bcrypt";

// Hashea una contraseña antes de guardarla en la base de datos.
// Nunca guardamos contraseñas en texto plano.
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compara la contraseña enviada por el usuario con el hash almacenado en la base de datos.
// Devuelve true si coinciden, false si no.
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
