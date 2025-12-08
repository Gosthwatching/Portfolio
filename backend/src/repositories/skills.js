const pool = require('../db/connection');

async function all() {
  const [rows] = await pool.query('SELECT * FROM skills ORDER BY name ASC');
  return rows;
}

async function one(id) {
  const [rows] = await pool.query('SELECT * FROM skills WHERE id=?', [id]);
  return rows[0];
}

async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO skills (name, level) VALUES (?,?)',
    [data.name, data.level]
  );
  return { id: result.insertId };
}

async function remove(id) {
  await pool.query('DELETE FROM skills WHERE id=?', [id]);
}

module.exports = { all, one, create, remove };