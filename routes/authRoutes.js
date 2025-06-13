const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro de usuario
router.post('/registrar', authController.registrar);

// Inicio de sesión
router.post('/login', authController.login);

// Obtener perfil del usuario autenticado
router.get('/perfil', authController.obtenerPerfil);

module.exports = router;