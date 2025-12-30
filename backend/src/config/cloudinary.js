const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage pour les images de projets
const projectStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/projects',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }]
  }
});

// Storage pour les avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
  }
});

// Storage pour les CV (PDF)
const cvStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/cv',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
});

// Multer upload instances
const uploadProject = multer({ 
  storage: projectStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadAvatar = multer({ 
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

const uploadCV = multer({ 
  storage: cvStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = {
  cloudinary,
  uploadProject,
  uploadAvatar,
  uploadCV
};
