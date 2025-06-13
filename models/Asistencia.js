const db = require('../config/database');

class Asistencia {
  static async registrar({ userId, subjectId, teacherId, date, checkInTime, status, sensorId, notes = null }) {
    const [result] = await db.execute(
      `INSERT INTO attendance 
       (user_id, subject_id, teacher_id, date, check_in_time, status, sensor_id, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, subjectId, teacherId, date, checkInTime, status, sensorId, notes]
    );
    return result.insertId;
  }

  static async obtenerPorUsuario(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM attendance WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  static async obtenerPorMateria(subjectId) {
    const [rows] = await db.execute(
      'SELECT * FROM attendance WHERE subject_id = ?',
      [subjectId]
    );
    return rows;
  }

  static async obtenerPorDocente(teacherId) {
    const [rows] = await db.execute(
      'SELECT * FROM attendance WHERE teacher_id = ?',
      [teacherId]
    );
    return rows;
  }

  static async actualizar(id, datos) {
    const campos = [];
    const valores = [];
    
    for (const [key, value] of Object.entries(datos)) {
      campos.push(`${key} = ?`);
      valores.push(value);
    }
    
    valores.push(id);
    
    await db.execute(
      `UPDATE attendance SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );
  }
}

module.exports = Asistencia;