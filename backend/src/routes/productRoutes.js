const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', getProductById);

module.exports = router;