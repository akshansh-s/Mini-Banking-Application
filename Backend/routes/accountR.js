const express = require('express');
const accountController = require('../controllers/accountC.js');
const authenticate  = require('../middleware/authM.js'); 
const router = express.Router();
const { validateDeposit, validateWithdraw } = require('../middleware/validations.js');

// Middleware to protect routes
router.use(authenticate);

router.get('/balance', accountController.getBalance);

router.post('/deposit', validateDeposit, accountController.deposit);

router.post('/withdraw', validateWithdraw,  accountController.withdraw);

module.exports = router;
