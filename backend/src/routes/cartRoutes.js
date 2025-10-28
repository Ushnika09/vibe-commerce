const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// @route   GET /api/cart
// @desc    Get user's cart
router.get('/', getCart);

// @route   POST /api/cart
// @desc    Add item to cart
router.post('/', addToCart);

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
router.put('/:id', updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
router.delete('/:id', removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear entire cart
router.delete('/', clearCart);

module.exports = router;