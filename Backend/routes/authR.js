const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

module.exports = router;
