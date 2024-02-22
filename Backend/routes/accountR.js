const express = require('express');
const accountController = require('../controllers/accountController');
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

const router = express.Router();

// Middleware to protect routes
router.use(authenticate);

// Check balance
router.get('/balance', accountController.getBalance);

// Deposit money
router.post('/deposit', accountController.deposit);

// Withdraw money
router.post('/withdraw', accountController.withdraw);

module.exports = router;
