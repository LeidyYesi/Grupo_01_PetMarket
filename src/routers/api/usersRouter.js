const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/usersController');

router.get('/', usersController.summary);
router.get('/:id', usersController.detail);

module.exports = router;