// src/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  description_fr: String,
  description_en: String,
  imageUrl: String,
  link: String,
  github: String,
  live: String,
  tags: [String],
  techStack: [String],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);