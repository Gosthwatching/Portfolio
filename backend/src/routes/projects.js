const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectsController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', auth, upload.single('image'), ctrl.create);
router.put('/:id', auth, upload.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;