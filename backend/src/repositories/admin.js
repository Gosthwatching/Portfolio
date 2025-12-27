// src/repositories/admin.js
const Admin = require('../models/Admin');

async function findByUsername(username) {
  return Admin.findOne({ username });
}

async function createAdmin(username, password_hash) {
  return Admin.create({ username, password_hash });
}

module.exports = { findByUsername, createAdmin };