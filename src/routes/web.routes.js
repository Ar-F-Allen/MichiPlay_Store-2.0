import { Router } from "express";

const router = Router();

// Ruta principal — página de inicio
router.get("/", (req, res) => {
  res.render("home", {
    title: "MichiPlay_Store — La tienda para tus gatos",
  });
});

// Formulario de registro
router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Crear cuenta",
  });
});

// Formulario de login
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Iniciar sesión",
  });
});

// Tienda (catálogo de productos para gatos)
router.get("/shop", (req, res) => {
  res.render("shop/index", {
    title: "Tienda — MichiPlay_Store",
  });
});

// Carrito de compras
router.get("/cart", (req, res) => {
  res.render("shop/cart", {
    title: "Mi carrito",
  });
});

// Sección de adopción
router.get("/adoption", (req, res) => {
  res.render("adoption/index", {
    title: "Adopción — MichiPlay_Store",
  });
});

export default router;
