const repo = require('../repositories/messages');

async function create(req, res) {
  try {
    const result = await repo.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function list(req, res) {
  try {
    const items = await repo.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { create, list };