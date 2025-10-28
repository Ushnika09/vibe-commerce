const express = require('express');
const router = express.Router();
const { processCheckout } = require('../controllers/checkoutController');

// @route   POST /api/checkout
// @desc    Process checkout and create order
router.post('/', processCheckout);

module.exports = router;