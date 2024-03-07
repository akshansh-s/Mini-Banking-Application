const express = require('express');
const transactionController = require('../controllers/transactionC.js');
const authenticate  = require('../middleware/authM.js'); 
const { validateTransfer } = require('../middleware/validations.js');

const router = express.Router();

router.use(authenticate);

// Transfer money
router.post('/transfer', validateTransfer, transactionController.transfer);

// transaction history for the user
router.get('/history', transactionController.history);

module.exports = router;
