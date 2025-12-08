const pool = require('../db/connection');

async function all() {
  const [rows] = await pool.query('SELECT * FROM experiences ORDER BY start_date DESC');
  return rows;
}

async function one(id) {
  const [rows] = await pool.query('SELECT * FROM experiences WHERE id=?', [id]);
  return rows[0];
}

async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO experiences (company, role, description, start_date, end_date) VALUES (?,?,?,?,?)',
    [data.company, data.role, data.description, data.start_date, data.end_date]
  );
  return { id: result.insertId };
}

async function remove(id) {
  await pool.query('DELETE FROM experiences WHERE id=?', [id]);
}

module.exports = { all, one, create, remove };