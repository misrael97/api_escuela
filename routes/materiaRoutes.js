const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const { auth, esAdmin } = require('../middlewares/auth');

// Crear una nueva materia (solo admin)
router.post('/', auth, esAdmin, materiaController.crear);

// Obtener todas las materias
router.get('/', auth, materiaController.obtenerTodas);

// Obtener una materia por ID
router.get('/:id', auth, materiaController.obtenerPorId);

// Actualizar una materia (solo admin)
router.put('/:id', auth, esAdmin, materiaController.actualizar);

// Eliminar una materia (solo admin)
router.delete('/:id', auth, esAdmin, materiaController.eliminar);

module.exports = router;