import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { getProducts, addToCart } from '../services/api';

const ProductGrid = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      
      // Update cart in parent
      if (onCartUpdate) {
        onCartUpdate();
      }
      
      // Show success notification
      showNotification('success', '✓ Product added to cart!');
    } catch (error) {
      showNotification('error', '✗ Failed to add product to cart');
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return <LoadingSpinner message="Loading amazing products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProducts} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification Toast */}
      {notification && (
  <div className={`fixed top-32 right-4 z-[150] px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 animate-slide-in ${
    notification.type === 'success' 
      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
  }`}>
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold">{notification.message}</span>
    </div>
  </div>
)}

      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Discover Our Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Premium quality products handpicked just for you. Free shipping on orders over $50!
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            🚚 Free Shipping
          </span>
          <span className="bg-success/10 text-success px-4 py-2 rounded-full text-sm font-semibold">
            ✓ Verified Products
          </span>
          <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
            ⚡ Fast Delivery
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Product Count */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-primary">{products.length}</span> products
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
          <p className="text-gray-600">Check back soon for amazing deals!</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;