const repo = require('../repositories/skills');

async function list(req, res) {
  res.json(await repo.all());
}

async function get(req, res) {
  const skill = await repo.one(req.params.id);
  if (!skill) return res.status(404).json({ message: 'Not found' });
  res.json(skill);
}

async function create(req, res) {
  const result = await repo.create(req.body);
  res.status(201).json(result);
}

async function remove(req, res) {
  await repo.remove(req.params.id);
  res.json({ message: 'Deleted' });
}

module.exports = { list, get, create, remove };