import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = ({ onCartUpdate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  
  const cartItems = location.state?.cartItems || [];

  const handleOrderComplete = (orderData) => {
    setOrder(orderData);
    // Refresh cart in parent component 
    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (order) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase, {order.order.customerName}!</p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-lg mb-4">Order Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Order Number:</span> {order.order.orderNumber}</p>
              <p><span className="font-medium">Total:</span> ${order.order.totalAmount.toFixed(2)}</p>
              <p><span className="font-medium">Email:</span> {order.order.customerEmail}</p>
              <p><span className="font-medium">Date:</span> {new Date(order.order.createdAt).toLocaleString()}</p>
            </div>
          </div>
          
          <button
            onClick={handleContinueShopping}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return <CheckoutForm cartItems={cartItems} onOrderComplete={handleOrderComplete} />;
};

export default CheckoutPage;