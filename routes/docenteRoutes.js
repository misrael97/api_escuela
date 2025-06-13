const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const { auth, esAdmin } = require('../middlewares/auth');

// Obtener todos los docentes (solo admin)
router.get('/', auth, esAdmin, docenteController.obtenerTodos);

// Obtener un docente por ID
router.get('/:id', auth, docenteController.obtenerPorId);

// Obtener materias de un docente
router.get('/:id/materias', auth, docenteController.obtenerMaterias);

// Obtener grupos de un docente
router.get('/:id/grupos', auth, docenteController.obtenerGrupos);

module.exports = router;