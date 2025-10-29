import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { formatCurrency } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Cart = ({ onCheckout, onCartUpdate }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(true);
      const updatedCart = await updateCartItem(itemId, newQuantity);
      setCart(updatedCart);
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      const updatedCart = await removeFromCart(itemId);
      setCart(updatedCart);
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      setUpdating(true);
      const clearedCart = await clearCart();
      setCart(clearedCart);
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  const cartItems = cart?.items || [];
  const isEmpty = cartItems.length === 0;
  const subtotal = cart?.totalAmount*80 || 0;
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shopping Cart
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          {isEmpty ? 'Your cart is empty' : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
        </p>
      </div>

      {isEmpty ? (
        /* Empty Cart State */
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="mb-6">
            <div className="inline-block p-6 bg-linear-to-br from-blue-100 to-purple-100 rounded-full mb-4">
              <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any items yet.</p>
          <Link to={"/"}
            
            className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClearCart}
                disabled={updating}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-purple-200"
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="shrink-0 w-32 h-32 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 pr-4">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          disabled={updating}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all disabled:opacity-50"
                          title="Remove item"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-2xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{item.price*80}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                          <div className="flex items-center bg-gray-100 rounded-xl">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              disabled={updating || item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-l-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                            >
                              −
                            </button>
                            <span className="w-16 text-center font-bold text-lg text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              disabled={updating}
                              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-r-xl transition-all disabled:opacity-50 font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">Subtotal</div>
                          <div className="text-xl font-black text-gray-800">
                            ₹{subtotal}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-gray-800">₹{(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                  <span className="text-gray-700 font-medium">Shipping</span>
                  <span className="text-xl font-bold text-gray-800">
                    {shipping === 0 ? (
                      <span className="text-green-600 text-sm font-semibold">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 5000 && (
                  <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      Add <span className="font-bold">₹{(5000 - (subtotal)).toFixed(2)}</span> more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center pt-3 bg-linear-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-black bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(cartItems)}
                disabled={updating}
                className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Proceed to Checkout
                </span>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-medium">Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;