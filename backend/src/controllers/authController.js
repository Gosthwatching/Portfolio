const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findByUsername } = require('../repositories/admin');

async function login(req, res) {
  const { username, password } = req.body;
  const admin = await findByUsername(username);
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token });
}

module.exports = { login };