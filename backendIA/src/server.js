require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[Server IA] Vintod Backend IA escuchando en el puerto ${PORT}`);
  console.log(`[Server IA] URL base: http://localhost:${PORT}/api/ai`);
});
