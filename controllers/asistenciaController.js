const Asistencia = require('../models/Asistencia');

const registrar = async (req, res) => {
  try {
    const { userId, subjectId, teacherId, date, checkInTime, status, sensorId, notes } = req.body;
    const id = await Asistencia.registrar({
      userId,
      subjectId,
      teacherId,
      date,
      checkInTime,
      status,
      sensorId,
      notes
    });
    res.status(201).json({ id, mensaje: 'Asistencia registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar asistencia', error: error.message });
  }
};

const obtenerPorUsuario = async (req, res) => {
  try {
    const asistencias = await Asistencia.obtenerPorUsuario(req.params.userId);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias', error: error.message });
  }
};

const obtenerPorMateria = async (req, res) => {
  try {
    const asistencias = await Asistencia.obtenerPorMateria(req.params.subjectId);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias', error: error.message });
  }
};

const obtenerPorDocente = async (req, res) => {
  try {
    const asistencias = await Asistencia.obtenerPorDocente(req.params.teacherId);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencias', error: error.message });
  }
};

const actualizar = async (req, res) => {
  try {
    await Asistencia.actualizar(req.params.id, req.body);
    res.json({ mensaje: 'Asistencia actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar asistencia', error: error.message });
  }
};

module.exports = {
  registrar,
  obtenerPorUsuario,
  obtenerPorMateria,
  obtenerPorDocente,
  actualizar
};