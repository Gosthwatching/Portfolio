const repo = require('../repositories/projects');

async function list(req, res) {
  try {
    const items = await repo.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function get(req, res) {
  try {
    const item = await repo.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const result = await repo.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    await repo.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { list, get, create, remove };