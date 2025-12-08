const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

async function login(req, res) {
  const { username, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM admin WHERE username=?', [username]);
  const admin = rows[0];
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
}

module.exports = { login };