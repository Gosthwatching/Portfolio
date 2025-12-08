const pool = require('../db/connection');

async function create(data) {
  const [result] = await pool.query(
    'INSERT INTO messages (sender_name, sender_email, subject, body) VALUES (?,?,?,?)',
    [data.sender_name, data.sender_email, data.subject, data.body]
  );
  return { id: result.insertId };
}

async function all() {
  const [rows] = await pool.query('SELECT * FROM messages ORDER BY received_at DESC');
  return rows;
}

module.exports = { create, all };