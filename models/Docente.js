const db = require('../config/database');
const Usuario = require('./Usuario');

class Docente {
  static async obtenerTodos() {
    const [rows] = await db.execute(
      'SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = "teacher"'
    );
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.execute(
      'SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = "teacher" AND u.id = ?',
      [id]
    );
    return rows[0];
  }

  static async obtenerMaterias(id) {
    const [rows] = await db.execute(
      `SELECT s.* FROM teacher_subject_group tsg
       JOIN subjects s ON tsg.subject_id = s.id
       WHERE tsg.teacher_id = ?`,
      [id]
    );
    return rows;
  }

  static async obtenerGrupos(id) {
    const [rows] = await db.execute(
      `SELECT g.* FROM teacher_subject_group tsg
       JOIN groups g ON tsg.group_id = g.id
       WHERE tsg.teacher_id = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = Docente;