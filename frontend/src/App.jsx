import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoadingSpinner from './components/LoadingSpinner';
import { getCart } from './services/api';
import './App.css';

function App() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItemCount = cart?.items?.length || 0;

  if (loading) {
    return <LoadingSpinner message="Initializing Vibe Commerce..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItemCount} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home onCartUpdate={fetchCart} />} />
          <Route path="/cart" element={<CartPage onCartUpdate={fetchCart} />} />
          <Route path="/checkout" element={<CheckoutPage onCartUpdate={fetchCart}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;