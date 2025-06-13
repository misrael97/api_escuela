const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.obtenerPorId(decoded.id);

    if (!usuario) {
      throw new Error();
    }

    req.token = token;
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Por favor autentícate.' });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario.role_id !== 1) { 
    return res.status(403).send({ error: 'Acceso denegado.' });
  }
  next();
};

const esDocente = (req, res, next) => {
  if (req.usuario.role_id !== 2) { 
    return res.status(403).send({ error: 'Acceso denegado.' });
  }
  next();
};

const esAlumno = (req, res, next) => {
  if (req.usuario.role_id !== 3) {
    return res.status(403).send({ error: 'Acceso denegado.' });
  }
  next();
};

module.exports = { auth, esAdmin, esDocente, esAlumno };