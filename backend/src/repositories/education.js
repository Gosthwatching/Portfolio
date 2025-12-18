// src/repositories/education.js
const Education = require('../models/Education');

async function getAll() { return Education.find().sort({ startDate: -1 }); }
async function getById(id) { return Education.findById(id); }
async function create(data) { return Education.create(data); }
async function update(id, data) { return Education.findByIdAndUpdate(id, data, { new: true }); }
async function remove(id) { return Education.findByIdAndDelete(id); }

module.exports = { getAll, getById, create, update, remove };