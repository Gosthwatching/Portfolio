const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/messagesController');
const auth = require('../middlewares/auth');

router.post('/', ctrl.create);
router.get('/', auth, ctrl.list);

module.exports = router;