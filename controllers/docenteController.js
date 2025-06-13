const Docente = require('../models/Docente');

const obtenerTodos = async (req, res) => {
  try {
    const docentes = await Docente.obtenerTodos();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener docentes', error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const docente = await Docente.obtenerPorId(req.params.id);
    if (!docente) {
      return res.status(404).json({ mensaje: 'Docente no encontrado' });
    }
    res.json(docente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener docente', error: error.message });
  }
};

const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Docente.obtenerMaterias(req.params.id);
    res.json(materias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener materias del docente', error: error.message });
  }
};

const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Docente.obtenerGrupos(req.params.id);
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener grupos del docente', error: error.message });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerMaterias,
  obtenerGrupos
};