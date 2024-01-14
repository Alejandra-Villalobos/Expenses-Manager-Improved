const express = require('express');

const router = express.Router();

const { createBank, getBanksFromUser, getOneBankFromUser, updateBank } = require('../controllers/bank')

router.post('/bank', createBank);
router.get('/bank/:bank_id', getOneBankFromUser);
router.get('/bank', getBanksFromUser);
router.put('/bank/:bank_id', updateBank);

module.exports = router;