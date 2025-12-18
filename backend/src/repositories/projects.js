// src/repositories/projects.js
const Project = require('../models/Project');

async function getAll() { return Project.find().sort({ createdAt: -1 }); }
async function getById(id) { return Project.findById(id); }
async function create(data) { return Project.create(data); }
async function update(id, data) { return Project.findByIdAndUpdate(id, data, { new: true }); }
async function remove(id) { return Project.findByIdAndDelete(id); }

module.exports = { getAll, getById, create, update, remove };