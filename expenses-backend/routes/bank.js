const express = require('express');

const router = express.Router();

const { createBank, getBanksFromUser, getOneBankFromUser, getAllBanks, updateBank } = require('../controllers/bank')

router.post('/bank', createBank);
router.get('/bank/:bank_id', getOneBankFromUser);
router.get('/bank', getBanksFromUser);
router.get('/bank_all', getAllBanks);
router.put('/bank/:bank_id', updateBank);

module.exports = router;