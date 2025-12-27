// src/repositories/experiences.js
const Experience = require('../models/experience.js');

async function getAll() { return Experience.find().sort({ startDate: -1 }); }
async function getById(id) { return Experience.findById(id); }
async function create(data) { return Experience.create(data); }
async function update(id, data) { return Experience.findByIdAndUpdate(id, data, { new: true }); }
async function remove(id) { return Experience.findByIdAndDelete(id); }

module.exports = { getAll, getById, create, update, remove };