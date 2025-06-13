const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const registrar = async (req, res) => {
  try {
    const { firstName, lastName, email, password, roleId } = req.body;
    

    const usuarioExistente = await Usuario.obtenerPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const usuarioId = await Usuario.crear({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId
    });
    
    res.status(201).json({ id: usuarioId, mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    const usuario = await Usuario.obtenerPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    
    
    const esContraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!esContraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token,
      usuario: {
        id: usuario.id,
        nombre: `${usuario.first_name} ${usuario.last_name}`,
        email: usuario.email,
        rol: usuario.role_id
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.obtenerPorId(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    
    delete usuario.password;
    
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
  }
};

module.exports = {
  registrar,
  login,
  obtenerPerfil
};