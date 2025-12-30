const repo = require('../repositories/profile');
const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

// Fonction helper pour uploader vers Cloudinary
const uploadToCloudinary = (buffer, folder, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

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
    // if an avatar image was uploaded
    if (req.files && req.files.avatar && req.files.avatar[0]) {
      const result = await uploadToCloudinary(
        req.files.avatar[0].buffer,
        'portfolio/avatars',
        'image'
      );
      req.body.avatar = result.secure_url;
    }
    
    // if a CV file was uploaded
    if (req.files && req.files.cv && req.files.cv[0]) {
      const result = await uploadToCloudinary(
        req.files.cv[0].buffer,
        'portfolio/cv',
        'raw'
      );
      req.body.cvUrl = result.secure_url;
    }
    
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
    const result = await uploadToCloudinary(
      req.file.buffer,
      'portfolio/cv',
      'raw'
    );
    const cvUrl = result.secure_url;
    const updated = await repo.update({ cvUrl });
    res.json(updated);
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
