const db = require('../config/database');
const Usuario = require('./Usuario');

class Alumno {
  static async obtenerTodos() {
    const [rows] = await db.execute(
      'SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = "student"'
    );
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.execute(
      'SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = "student" AND u.id = ?',
      [id]
    );
    return rows[0];
  }

  static async obtenerGrupos(id) {
    const [rows] = await db.execute(
      `SELECT g.* FROM student_group sg 
       JOIN groups g ON sg.group_id = g.id 
       WHERE sg.student_id = ?`,
      [id]
    );
    return rows;
  }

  static async obtenerAsistencias(id) {
    const [rows] = await db.execute(
      'SELECT * FROM attendance WHERE user_id = ?',
      [id]
    );
    return rows;
  }

  static async obtenerCalificaciones(id) {
    const [rows] = await db.execute(
      'SELECT * FROM grades WHERE student_id = ?',
      [id]
    );
    return rows;
  }
}

module.exports = Alumno;