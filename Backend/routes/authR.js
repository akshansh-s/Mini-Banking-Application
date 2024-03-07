const express = require('express');
const authController = require('../controllers/authC.js');
const { validateSignup, validateSignin } = require('../middleware/validations.js');

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);

router.post('/signin', validateSignin, authController.signin);

module.exports = router;
