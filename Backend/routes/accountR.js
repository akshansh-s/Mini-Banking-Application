const express = require('express');
const accountController = require('../controllers/accountC.js');
const authenticate  = require('../middleware/authM.js'); // Assuming you have authentication middleware

const router = express.Router();

// Middleware to protect routes
router.use(authenticate);

router.get('/balance', accountController.getBalance);

router.post('/deposit', accountController.deposit);

router.post('/withdraw',  accountController.withdraw);

module.exports = router;
