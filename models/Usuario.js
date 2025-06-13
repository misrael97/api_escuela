const db = require('../config/database');

class Usuario {
  static async crear({ firstName, lastName, email, password, roleId, isActive = true }) {
    const [result] = await db.execute(
      'INSERT INTO users (first_name, last_name, email, password, role_id, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, password, roleId, isActive]
    );
    return result.insertId;
  }

  static async obtenerPorEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async obtenerPorId(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
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
      `UPDATE users SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );
  }

  static async eliminar(id) {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
  }

  static async obtenerTodos() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }
}

module.exports = Usuario;