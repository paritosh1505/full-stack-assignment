const express = require('express');
const router = express.Router();

const featureController = require('../controller/premiumFeatures');
const authenticatemiddleware = require('../middleware/auth');

router.put('/calculatetotal', authenticatemiddleware.authorisation, featureController.showleaderboard);

module.exports = router;