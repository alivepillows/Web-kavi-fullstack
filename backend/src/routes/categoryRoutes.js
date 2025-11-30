const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');

router.get('/', auth, categoryController.getAll);
router.post('/', auth, categoryController.create);
router.delete('/:id', auth, categoryController.delete);

module.exports = router;
