const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', ctrl.get);
router.put('/', auth, ctrl.update);
router.post('/upload-cv', auth, upload.single('cv'), ctrl.uploadCV);
router.get('/download-cv', ctrl.downloadCV);

module.exports = router;
