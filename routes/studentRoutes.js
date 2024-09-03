const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const jwtConfig = require('../config/jwtConfig');

// Create a new student
router.post('/create',jwtConfig.verifyToken, studentController.createStudent);


// Get all student
router.get('/',jwtConfig.verifyToken, studentController.getAllStudent);

// Edit an existing student
router.put('/edit/:id', jwtConfig.verifyToken, studentController.editStudent);

// Delete a student
router.delete('/delete/:id',jwtConfig.verifyToken, studentController.deleteStudent);

module.exports = router;
