// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares para parsear JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Importar la conexión a la base de datos
require('./config/db');

// Importar rutas
const cuentaRoutes = require('./routes/cuentaRoutes');
const loginRoutes = require('./routes/loginRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const meGustaRoutes = require('./routes/megustaRoutes');

// Usar las rutas
app.use('/cuenta', cuentaRoutes);
app.use('/login', loginRoutes);
app.use('/receta', recetaRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/me_gusta', meGustaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
