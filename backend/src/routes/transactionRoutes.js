const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

router.get('/', auth, transactionController.getAll);
router.post('/', auth, transactionController.create);
router.delete('/:id', auth, transactionController.delete);

module.exports = router;
