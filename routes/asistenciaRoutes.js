const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');
const { auth } = require('../middlewares/auth');

// Registrar asistencia
router.post('/', auth, asistenciaController.registrar);

// Obtener asistencias por usuario
router.get('/usuario/:userId', auth, asistenciaController.obtenerPorUsuario);

// Obtener asistencias por materia
router.get('/materia/:subjectId', auth, asistenciaController.obtenerPorMateria);

// Obtener asistencias por docente
router.get('/docente/:teacherId', auth, asistenciaController.obtenerPorDocente);

// Actualizar asistencia
router.put('/:id', auth, asistenciaController.actualizar);

module.exports = router;