const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const { auth, esAdmin } = require('../middlewares/auth');

// Obtener todos los alumnos (solo admin)
router.get('/', auth, esAdmin, alumnoController.obtenerTodos);

// Obtener un alumno por ID
router.get('/:id', auth, alumnoController.obtenerPorId);

// Obtener grupos de un alumno
router.get('/:id/grupos', auth, alumnoController.obtenerGrupos);

// Obtener asistencias de un alumno
router.get('/:id/asistencias', auth, alumnoController.obtenerAsistencias);

// Obtener calificaciones de un alumno
router.get('/:id/calificaciones', auth, alumnoController.obtenerCalificaciones);

module.exports = router;