const db = require('../config/database');

class Materia {
  static async crear({ name, code }) {
    const [result] = await db.execute(
      'INSERT INTO subjects (name, code) VALUES (?, ?)',
      [name, code]
    );
    return result.insertId;
  }

  static async obtenerTodas() {
    const [rows] = await db.execute('SELECT * FROM subjects');
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.execute('SELECT * FROM subjects WHERE id = ?', [id]);
    return rows[0];
  }

  static async actualizar(id, { name, code }) {
    await db.execute(
      'UPDATE subjects SET name = ?, code = ? WHERE id = ?',
      [name, code, id]
    );
  }

  static async eliminar(id) {
    await db.execute('DELETE FROM subjects WHERE id = ?', [id]);
  }
}

module.exports = Materia;