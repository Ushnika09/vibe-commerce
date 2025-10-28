const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Process checkout
// @route   POST /api/checkout
// @access  Public
const processCheckout = async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;

    // Validation
    if (!customerName || !customerEmail || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ 
        message: 'Customer name, email, and cart items are required' 
      });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = await Order.create({
      customerName,
      customerEmail,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      orderNumber,
      status: 'completed'
    });

    // Clear the cart after successful checkout
    const cart = await Cart.findOne({ userId: 'guest_user' });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ message: 'Server error while processing checkout' });
  }
};

module.exports = {
  processCheckout
};