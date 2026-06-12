// Valida los datos enviados para registro e inicio de sesión.
// Si hay errores, se agregan al arreglo errors.
// El middleware de validación se encarga de responder al cliente con esos errores.

export const validateRegister = (req) => {
  const { fullName, email, phone, address, password } = req.body;
  const errors = [];

  if (!fullName || fullName.trim() === "") {
    errors.push("El nombre completo es obligatorio.");
  }

  if (!email || email.trim() === "") {
    errors.push("El email es obligatorio.");
  }

  if (!phone || phone.trim() === "") {
    errors.push("El teléfono es obligatorio.");
  }

  if (!address || address.trim() === "") {
    errors.push("La dirección es obligatoria.");
  }

  if (!password || password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  return errors;
};

export const validateLogin = (req) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim() === "") {
    errors.push("El email es obligatorio.");
  }

  if (!password || password.trim() === "") {
    errors.push("La contraseña es obligatoria.");
  }

  return errors;
};
