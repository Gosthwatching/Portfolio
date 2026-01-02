// src/repositories/skills.js
const Skill = require('../models/Skill');

async function getAll() { return Skill.find().sort({ order: 1, createdAt: -1 }); }
async function getById(id) { return Skill.findById(id); }
async function create(data) { return Skill.create(data); }
async function update(id, data) { return Skill.findByIdAndUpdate(id, data, { new: true }); }

async function updateOrder(orderArray) {
	// orderArray: [{ _id, order }]
	const bulkOps = orderArray.map(({ _id, order }) => ({
		updateOne: {
			filter: { _id },
			update: { $set: { order } }
		}
	}));
	return Skill.bulkWrite(bulkOps);
}
async function remove(id) { return Skill.findByIdAndDelete(id); }

module.exports = { getAll, getById, create, update, remove, updateOrder };