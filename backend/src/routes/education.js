const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/educationController');
const auth = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;