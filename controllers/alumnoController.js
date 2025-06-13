const Alumno = require('../models/Alumno');

const obtenerTodos = async (req, res) => {
  try {
    const alumnos = await Alumno.obtenerTodos();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener alumnos', error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const alumno = await Alumno.obtenerPorId(req.params.id);
    if (!alumno) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener alumno', error: error.message });
  }
};

const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Alumno.obtenerGrupos(req.params.id);
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener grupos del alumno', error: error.message });
  }
};

const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await Alumno.obtenerAsistencias(req.params.id);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias', error: error.message });
  }
};

const obtenerCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Alumno.obtenerCalificaciones(req.params.id);
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener calificaciones', error: error.message });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerGrupos,
  obtenerAsistencias,
  obtenerCalificaciones
};