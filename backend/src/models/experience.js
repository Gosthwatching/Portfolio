// src/models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: String,
  startDate: Date,
  endDate: Date,
  description: String,
  description_fr: String,
  description_en: String,
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);