const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const { uploadAvatar, uploadCV } = require('../config/cloudinary');
const multer = require('multer');

// Créer un middleware combiné pour avatar + CV
const uploadProfile = multer({
  storage: multer.memoryStorage()
});

router.get('/', ctrl.get);
router.put('/', auth, uploadProfile.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), ctrl.update);
router.post('/upload-cv', auth, uploadCV.single('cv'), ctrl.uploadCV);
router.get('/download-cv', ctrl.downloadCV);

module.exports = router;
