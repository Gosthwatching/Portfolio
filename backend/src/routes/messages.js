const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/messagesController');
const auth = require('../middlewares/auth');

router.post('/', ctrl.create);
router.get('/', auth, ctrl.list);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;