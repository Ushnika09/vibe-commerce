import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

const CartPage = ({ onCartUpdate }) => {
  const navigate = useNavigate();

  const handleCheckout = (cartItems) => {
    navigate('/checkout', { state: { cartItems } });
  };

  return <Cart onCheckout={handleCheckout} onCartUpdate={onCartUpdate} />;
};

export default CartPage;