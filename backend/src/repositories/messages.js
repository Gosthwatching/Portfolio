// src/repositories/messages.js
const Message = require('../models/Message');

async function getAll() { return Message.find().sort({ createdAt: -1 }); }
async function getById(id) { return Message.findById(id); }
async function create(data) { return Message.create(data); }
async function markRead(id, read = true) {
  return Message.findByIdAndUpdate(id, { read }, { new: true });
}
async function remove(id) { return Message.findByIdAndDelete(id); }

module.exports = { getAll, getById, create, markRead, remove };