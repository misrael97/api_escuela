// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Rutas base
// app.get('/', (req, res) => {
//   res.send('API del Sistema Escolar');
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/alumnos', require('./routes/alumnoRoutes'));
app.use('/api/docentes', require('./routes/docenteRoutes'));
app.use('/api/materias', require('./routes/materiaRoutes'));
app.use('/api/asistencias', require('./routes/asistenciaRoutes'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});