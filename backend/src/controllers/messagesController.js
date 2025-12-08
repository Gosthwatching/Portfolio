const repo = require('../repositories/messages');

async function create(req, res) {
  const result = await repo.create(req.body);
  res.status(201).json(result);
}

async function list(req, res) {
  res.json(await repo.all());
}

module.exports = { create, list };