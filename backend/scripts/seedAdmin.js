#!/usr/bin/env node
/**
 * Create or update admin user in MongoDB
 * Usage: node scripts/seedAdmin.js <username> <password>
 * Example: node scripts/seedAdmin.js zed Gosthwatch_20040426!!
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const connectDB = require('../src/db/connection');
const { createAdmin, findByUsername } = require('../src/repositories/admin');

async function main() {
  const [, , username, password] = process.argv;

  if (!username || !password) {
    console.error('Usage: node scripts/seedAdmin.js <username> <password>');
    console.error('Example: node scripts/seedAdmin.js zed Gosthwatch_20040426!!');
    process.exit(1);
  }

  try {
    await connectDB();
    console.log('✅ MongoDB connected');

    // Hash password
    const hash = await bcrypt.hash(password, 10);
    console.log('✓ Password hashed');

    // Check if admin exists
    let admin = await findByUsername(username);
    if (admin) {
      // Update password
      admin.password_hash = hash;
      await admin.save();
      console.log('✓ Admin password updated:', username);
    } else {
      // Create new admin
      admin = await createAdmin(username, hash);
      console.log('✓ Admin user created:', username);
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log('\n✓ JWT Token generated (valid for 30 days):');
    console.log(token);

    console.log('\n📋 Use this token in Postman:');
    console.log('Header: Authorization');
    console.log('Value: Bearer', token);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
