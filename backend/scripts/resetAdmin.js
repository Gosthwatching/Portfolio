const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config(path.join(__dirname, '..', '.env'));

const dbPath = path.join(__dirname, '..', 'portfolio.db');
const db = new Database(dbPath);

async function resetAdmin() {
  const [, , username, password] = process.argv;

  if (!username || !password) {
    console.error('Usage: node scripts/resetAdmin.js <username> <password>');
    console.error('Example: node scripts/resetAdmin.js zed Gosthwatch_20040426!!');
    process.exit(1);
  }

  try {
    // supprimer les administrateurs existants
    const deleteStmt = db.prepare('DELETE FROM admin');
    const deletedCount = deleteStmt.run().changes;
    console.log(`✓ Deleted ${deletedCount} existing admin(s)`);

    // Hash nouveau mot de passe
    const hash = await bcrypt.hash(password, 10);
    console.log('✓ Password hashed');

    // inserer le nouvel administrateur
    const insertStmt = db.prepare(
      'INSERT INTO admin (username, password_hash) VALUES (?, ?)'
    );
    const result = insertStmt.run(username, hash);
    console.log('✓ New admin created:', username);

    // prend l'ID de l'administrateur
    const getStmt = db.prepare('SELECT id FROM admin WHERE username = ?');
    const admin = getStmt.get(username);
    const adminId = admin.id;

    // genère le token JWT
    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log('\n✓ JWT Token generated (valid for 30 days):');
    console.log(token);

    console.log('\n📋 Use this token in Postman:');
    console.log('Header: Authorization');
    console.log('Value: Bearer', token);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    db.close();
  }
}

resetAdmin();