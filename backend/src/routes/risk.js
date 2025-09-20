const express = require('express');
const { analyzePayment } = require('../controllers/riskController');

const router = express.Router();

router.post('/analyze', analyzePayment);

module.exports = router;