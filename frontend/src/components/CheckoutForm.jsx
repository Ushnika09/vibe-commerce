import React, { useState } from 'react';
import { checkout, clearCart } from '../services/api';

const CheckoutForm = ({ cartItems, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  });
  const [loading, setLoading] = useState(false);

  // Currency conversion rate
  const USD_TO_INR = 80;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Process checkout
      const result = await checkout(formData.customerName, formData.customerEmail, cartItems);
      
      // Clear cart after successful checkout
      await clearCart();
      
      // Notify parent component
      onOrderComplete(result);
    } catch (error) {
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const subtotalUSD = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotalINR = subtotalUSD * USD_TO_INR;
  const shipping = subtotalINR > 5000 ? 0 : 500;
  const totalINR = subtotalINR + shipping;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item._id || item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{(item.price * USD_TO_INR).toFixed(2)}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity * USD_TO_INR).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">₹{subtotalINR.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            
            {/* Free Shipping Notice */}
            {subtotalINR < 5000 && (
              <div className="bg-blue-100 border-l-4 border-blue-500 p-2 rounded text-sm text-blue-800">
                Add <span className="font-bold">₹{(5000 - subtotalINR).toFixed(2)}</span> more for FREE shipping!
              </div>
            )}
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>₹{totalINR.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || cartItems.length === 0}
          className="w-full  text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700  font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;