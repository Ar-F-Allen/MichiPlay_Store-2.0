import ApiError from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
import { User, Cart, sequelize } from "../models/index.js";

// Registra un nuevo usuario en la base de datos.
// También crea automáticamente un carrito activo para el usuario.
export const register = async (userData) => {
  // Verificamos que el email no esté ya registrado
  const existingUser = await User.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new ApiError(409, "El email ya se encuentra registrado.");
  }

  // Usamos una transacción para que si algo falla, se revierta todo
  const transaction = await sequelize.transaction();

  try {
    // Hasheamos la contraseña antes de guardarla
    const hashedPassword = await hashPassword(userData.password);

    const user = await User.create(
      {
        ...userData,
        password: hashedPassword,
      },
      { transaction }
    );

    // Creamos el carrito inicial del usuario automáticamente al registrarse
    await Cart.create(
      {
        userId: user.id,
        status: "active",
      },
      { transaction }
    );

    await transaction.commit();

    // Devolvemos solo los datos necesarios, nunca la contraseña
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Valida las credenciales del usuario y devuelve un token JWT.
export const login = async ({ email, password }) => {
  // Buscamos al usuario por su email
  const user = await User.findOne({ where: { email } });

  // Usamos el mismo mensaje para email no encontrado y contraseña incorrecta
  // para no revelar si el email existe o no (seguridad)
  if (!user) {
    throw new ApiError(401, "Credenciales inválidas.");
  }

  const passwordIsValid = await comparePassword(password, user.password);

  if (!passwordIsValid) {
    throw new ApiError(401, "Credenciales inválidas.");
  }

  // Generamos el token con el id y email del usuario
  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  };
};
