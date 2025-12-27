// src/models/Certification.js
const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: String,
  url: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
