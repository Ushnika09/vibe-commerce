import { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(product.id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Category colors
  const getCategoryColor = (category) => {
    const colors = {
      "men's clothing": "bg-blue-500",
      "women's clothing": "bg-pink-500",
      "jewelery": "bg-purple-500",
      "electronics": "bg-cyan-500",
      "default": "bg-indigo-500"
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border-2 border-transparent hover:border-primary/20 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Colorful Gradient */}
      <div className="relative h-72 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-contain p-8 transition-all duration-700 ${
            isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
          }`}
        />
        
        {/* Animated Background Shapes */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl transition-all duration-500 ${
          isHovered ? 'scale-150' : 'scale-100'
        }`} />
        <div className={`absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl transition-all duration-500 ${
          isHovered ? 'scale-150' : 'scale-100'
        }`} />
        
        {/* Category Badge with Dynamic Color */}
        <div className="absolute top-4 left-4">
          <span className={`${getCategoryColor(product.category)} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm uppercase tracking-wide`}>
            {product.category}
          </span>
        </div>

        {/* Sale Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg animate-pulse">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              SALE
            </span>
          </div>
        </div>

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <button className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 py-2 rounded-lg font-semibold text-sm transition-all">
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">(4.0)</span>
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section with Gradient */}
        <div className="mb-5 bg-gradient-to-r from-primary/10 via-purple-50 to-pink-50 p-4 rounded-xl">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 mt-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Save 30%
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Selector with Colors */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQty}
              disabled={loading || quantity <= 1}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-primary hover:to-primary-dark hover:text-white border-2 border-gray-300 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-md hover:shadow-lg active:scale-95"
            >
              −
            </button>
            
            <div className="flex-1 text-center bg-gradient-to-r from-primary/10 to-purple-50 py-2 rounded-xl">
              <span className="text-2xl font-black text-gray-800">{quantity}</span>
            </div>
            
            <button
              onClick={increaseQty}
              disabled={loading}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-primary hover:to-primary-dark hover:text-white border-2 border-gray-300 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-md hover:shadow-lg active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button with Gradient */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary-dark hover:via-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-base transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding to Cart...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 relative z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </span>
          )}
        </button>

        {/* Wishlist Button */}
        <button className="mt-3 w-full border-2 border-gray-300 hover:border-pink-500 text-gray-700 hover:text-pink-500 py-2 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group/wishlist">
          <svg className="w-5 h-5 group-hover/wishlist:fill-pink-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;