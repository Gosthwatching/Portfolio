const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectsController');
const auth = require('../middlewares/auth');
const { uploadProject } = require('../config/cloudinary');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', auth, uploadProject.single('image'), ctrl.create);
router.put('/:id', auth, uploadProject.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;