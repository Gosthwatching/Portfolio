// src/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: String,
  bio: String,
  email: { type: String, required: true },
  phone: String,
  location: String,
  website: String,
  github: String,
  linkedin: String,
  twitter: String,
  avatar: String,
  cvUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
