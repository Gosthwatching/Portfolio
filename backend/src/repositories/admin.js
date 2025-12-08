const pool = require('../db/connection');

async function findByUsername(username) {
  const [rows] = await pool.execute('SELECT * FROM admin WHERE username = ? LIMIT 1', [username]);
  return rows[0] || null;
}

module.exports = { findByUsername };