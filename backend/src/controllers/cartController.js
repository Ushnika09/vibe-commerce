const Cart = require('../models/Cart');
const axios = require('axios');

// Helper function to get product details
const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return {
      id: response.data.id,
      name: response.data.title,
      price: response.data.price,
      image: response.data.image
    };
  } catch (error) {
    return null;
  }
};

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'guest_user' });
    
    if (!cart) {
      cart = await Cart.create({ userId: 'guest_user', items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Fetch product details from Fake Store API
    const product = await getProductDetails(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: 'guest_user' });
    if (!cart) {
      cart = new Cart({ userId: 'guest_user', items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === parseInt(productId)
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error while adding to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB _id of cart item
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const cart = await Cart.findOne({ userId: 'guest_user' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error while updating cart' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({ userId: 'guest_user' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull(id);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error while removing from cart' });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'guest_user' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};