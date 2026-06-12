# 😺 MichiPlay_Store

API REST con JWT para tienda especializada en gatos hecha en los primeros modulos del Bootcamp.
Ahora cuenta con Backend con Node.js + Express + Sequelize (PostgreSQL). Frontend con Handlebars.

## Instalación

# 1. Instalar dependencias
npm install

# 2. Crear el archivo .env a partir del ejemplo
cp .env.example .env
# Editar .env con tus datos de PostgreSQL

# 3. Inicializar la base de datos (crea DB + tablas + datos de prueba)
npm run db:init

# 4. Iniciar el servidor en desarrollo
npm run dev

Abre http://localhost:3000



## Scripts disponibles

| `npm run dev` | Servidor con nodemon (recarga automática) |
| `npm run start` | Servidor en producción |
| `npm run db:create` | Crea la base de datos |
| `npm run db:sync` | Sincroniza los modelos con la BD |
| `npm run db:seed` | Inserta datos de prueba |
| `npm run db:init` | Todo en uno: create + sync + seed |



## Usuarios de prueba

| Email | Contraseña |

| maria@michiplay.cl | 123456 |
| carlos@michiplay.cl | 123456 |


## Vistas disponibles

| Ruta | Descripción |

| `/` | Página de inicio |
| `/shop` | Tienda de productos para gatos (requiere login) |
| `/cart` | Carrito de compras (requiere login) |
| `/adoption` | Sección de adopción con formulario |
| `/login` | Iniciar sesión |
| `/register` | Crear cuenta |



## Rutas de la API

### Auth (públicas)

POST /api/v1/auth/register   — Registro de usuario
POST /api/v1/auth/login      — Login, devuelve JWT
GET  /api/v1/auth/me         — Datos del usuario autenticado (requiere JWT)


### Productos (requieren JWT)

GET /api/v1/products                      — Todos los productos
GET /api/v1/products/:id                  — Producto por ID
GET /api/v1/products/category/:category   — Filtrar por categoría


### Carrito (requieren JWT — cada usuario ve solo el suyo)

GET    /api/v1/cart               — Ver carrito activo
POST   /api/v1/cart/items         — Agregar producto  { productId, quantity }
PUT    /api/v1/cart/items/:itemId  — Cambiar cantidad  { quantity }
DELETE /api/v1/cart/items/:itemId  — Eliminar producto
DELETE /api/v1/cart               — Vaciar carrito
POST   /api/v1/cart/checkout      — Finalizar compra
```

### Autenticación en headers

Authorization: Bearer <token>


## Estructura del proyecto

```
michiplay-store/
├── server.js                  # Punto de entrada
├── scripts/
│   ├── createDatabase.js      # Crea la BD
│   ├── syncDatabase.js        # Sincroniza tablas
│   ├── seedDatabase.js        # Datos de prueba
│   └── initDatabase.js        # Todo en uno
└── src/
    ├── app.js                 # Configuración Express
    ├── config/
    │   ├── database.js        # Conexión Sequelize
    │   └── env.js             # Variables de entorno
    ├── controllers/           # Reciben req/res y llaman al service
    ├── middlewares/           # auth, error, validate
    ├── models/                # User, Product, Cart, CartItem
    ├── routes/                # Rutas API y web
    ├── services/              # Lógica de negocio
    ├── utils/                 # ApiError, asyncHandler, jwt, password, response
    ├── validations/           # Validaciones de campos
    ├── views/                 # Plantillas Handlebars
    │   ├── adoption/          # Vista de adopción
    │   ├── auth/              # Login y registro
    │   ├── layouts/           # Layout principal
    │   └── shop/              # Tienda y carrito
    └── public/                # CSS, JS del frontend
```
