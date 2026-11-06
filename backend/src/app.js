const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const profilesRouter = require('./routes/profiles.routes');
const productsRouter = require('./routes/products.routes');
const categoriesRouter = require('./routes/categories.routes');
const brandsRouter = require('./routes/brands.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares de seguridad
app.use(helmet());

// Middlewares de logging
// 1. Mostrar logs en la terminal
app.use(morgan('dev'));

// 2. Guardar logs en un archivo
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Configuración CORS con soporte de credenciales (cookies HTTP-Only)
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (ej: curl, postman, apps móviles)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // En desarrollo permitir origen dinámico
  },
  credentials: true, // Permitir envío y recepción de cookies
}));

// Middlewares de parsing del body y cookies
app.use(express.json());
app.use(cookieParser()); // Habilitar lectura de req.cookies

// Rutas base bajo /api
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/brands', brandsRouter);

// Manejo de rutas no encontradas (404)
app.use(notFound);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;
