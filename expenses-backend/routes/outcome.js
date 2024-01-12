const express = require('express');

const router = express.Router();

const { createOutcome, getOutcomes, getOutcome } = require('../controllers/outcome')

router.post('/outcome', createOutcome);
router.get('/outcome', getOutcomes);
router.get('/outcome/:outcome_id', getOutcome);

module.exports = router;