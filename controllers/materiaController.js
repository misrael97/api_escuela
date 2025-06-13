const Materia = require('../models/Materia');

const crear = async (req, res) => {
  try {
    const { name, code } = req.body;
    const id = await Materia.crear({ name, code });
    res.status(201).json({ id, mensaje: 'Materia creada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear materia', error: error.message });
  }
};

const obtenerTodas = async (req, res) => {
  try {
    const materias = await Materia.obtenerTodas();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener materias', error: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const materia = await Materia.obtenerPorId(req.params.id);
    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }
    res.json(materia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener materia', error: error.message });
  }
};

const actualizar = async (req, res) => {
  try {
    const { name, code } = req.body;
    await Materia.actualizar(req.params.id, { name, code });
    res.json({ mensaje: 'Materia actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar materia', error: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    await Materia.eliminar(req.params.id);
    res.json({ mensaje: 'Materia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar materia', error: error.message });
  }
};

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorId,
  actualizar,
  eliminar
};