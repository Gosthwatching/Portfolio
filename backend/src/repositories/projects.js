const pool = require('../db/connection');

async function all() {
  const [rows] = await pool.query('SELECT * FROM projects');
  return rows;
}

async function one(id) {
  const [rows] = await pool.query('SELECT * FROM projects WHERE id=?', [id]);
  return rows[0];
}

async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO projects (title, short_description, long_description, link) VALUES (?,?,?,?)',
    [data.title, data.short_description, data.long_description, data.link]
  );
  return { id: result.insertId };
}

async function remove(id) {
  await pool.query('DELETE FROM projects WHERE id=?', [id]);
}

module.exports = { all, one, create, remove };