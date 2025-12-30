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
    if (req.file) {
      // Cloudinary renvoie l'URL complète dans req.file.path
      req.body.imageUrl = req.file.path;
    }
    // Parser tags et techStack si ce sont des strings JSON
    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = [];
      }
    }
    if (typeof req.body.techStack === 'string') {
      try {
        req.body.techStack = JSON.parse(req.body.techStack);
      } catch (e) {
        req.body.techStack = [];
      }
    }
    const result = await repo.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création projet' });
  }
}

async function update(req, res) {
  try {
    if (req.file) {
      req.body.imageUrl = req.file.path; // Cloudinary URL
    }
    // Parser tags et techStack si ce sont des strings JSON
    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = [];
      }
    }
    if (typeof req.body.techStack === 'string') {
      try {
        req.body.techStack = JSON.parse(req.body.techStack);
      } catch (e) {
        req.body.techStack = [];
      }
    }
    const result = await repo.update(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: 'Projet introuvable' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur maj projet' });
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

module.exports = { list, get, create, update, remove };