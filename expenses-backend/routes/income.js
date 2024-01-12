const express = require('express');

const router = express.Router();

const { createIncome, getIncomes, getIncome } = require('../controllers/income')

router.post('/income', createIncome);
router.get('/income', getIncomes);
router.get('/income/:income_id', getIncome);

module.exports = router;