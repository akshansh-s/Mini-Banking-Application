const express = require('express');
const transactionController = require('../controllers/transactionC.js');
const { authenticate } = require('../middleware/authM.js'); // Assuming you have authentication middleware

const router = express.Router();

// Middleware to protect routes
router.use(authenticate);

// Transfer money
router.post('/transfer', transactionController.transfer);

// Get transaction history for the user
router.get('/history', transactionController.history);

module.exports = router;
