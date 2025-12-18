// src/models/Education.js
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: String,
  field: String,
  startDate: Date,
  endDate: Date,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);