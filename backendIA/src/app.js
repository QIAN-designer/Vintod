const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const aiRouter = require('./routes/ai.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares de seguridad y logging
app.use(helmet());
app.use(morgan('dev'));

// Configuración CORS
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rutas base bajo /api/ai
app.use('/api/ai', aiRouter);

// Manejo de rutas no encontradas (404) y errores centralizados
app.use(notFound);
app.use(errorHandler);

module.exports = app;
