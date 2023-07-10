const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create a user
router.post('/users', userController.createUser);

module.exports = router;