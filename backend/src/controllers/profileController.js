const repo = require('../repositories/profile');
const path = require('path');
const fs = require('fs');

async function get(req, res) {
  try {
    const profile = await repo.get();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const result = await repo.update(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function uploadCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const cvUrl = '/uploads/' + req.file.filename;
    const result = await repo.update({ cvUrl });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function downloadCV(req, res) {
  try {
    const profile = await repo.get();
    if (!profile.cvUrl) {
      return res.status(404).json({ message: 'CV not found' });
    }
    const filePath = path.join(__dirname, '..', '..', profile.cvUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'CV file not found' });
    }
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { get, update, uploadCV, downloadCV };
