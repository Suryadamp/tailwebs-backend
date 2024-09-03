const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create a new user
router.post('/create', userController.createUser);

//Login user
router.post('/login', userController.userLogin);

module.exports = router;
