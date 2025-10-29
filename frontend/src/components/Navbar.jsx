import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-300 border-b-2 border-blue-400'
      : 'text-gray-300 hover:text-blue-200 transition-all';

  return (
    <>
      {/* Navbar */}
      <nav className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 text-white sticky top-0 z-100 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/*  Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-linear-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg group-hover:text-blue-300 transition-colors">
                  Vibe Commerce
                </h1>
                <p className="text-xs text-blue-200 hidden sm:block font-medium">
                  Your Everyday Style Hub
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-lg font-semibold">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/cart" className={isActive('/cart')}>Cart</Link>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative group transform hover:scale-110 transition-transform"
            >
              <svg
                className="w-7 h-7 text-white group-hover:text-blue-300 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6H19"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="focus:outline-none hover:text-blue-300 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/*  Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-3 space-y-3 text-lg">
              <Link to="/" onClick={toggleMobileMenu} className={`${isActive('/')} block`}>
                Home
              </Link>
              <Link to="/cart" onClick={toggleMobileMenu} className={`${isActive('/cart')} block`}>
                Cart
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/*  Feature Banner  */}
      <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 shadow-xl sticky top-20 z-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm sm:text-base font-semibold">
            {/* Feature 1 */}
            <div className="flex items-center gap-2 whitespace-nowrap hover:scale-110 transition-transform cursor-pointer">
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Free Shipping Over ₹5000!</span>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-2 whitespace-nowrap hover:scale-110 transition-transform cursor-pointer">
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Secure Payment</span>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-2 whitespace-nowrap hover:scale-110 transition-transform cursor-pointer">
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span>Easy Returns</span>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-2 whitespace-nowrap hover:scale-110 transition-transform cursor-pointer">
              <div className="bg-white/30 p-1.5 rounded-full backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
