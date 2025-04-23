import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, History, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-primary-500 font-display font-bold text-2xl">
          <span>TastyBites</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors">
            Home
          </Link>
          <Link to="/menu" className="text-gray-700 hover:text-primary-500 transition-colors">
            Menu
          </Link>
          {user ? (
            <Link to="/order-history" className="text-gray-700 hover:text-primary-500 transition-colors">
              Orders
            </Link>
          ) : null}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSignOut}
                className="text-gray-600 hover:text-primary-500 flex items-center"
              >
                <LogOut size={18} className="mr-1" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="text-gray-600 hover:text-primary-500 flex items-center"
            >
              <User size={18} className="mr-1" />
              <span>Sign In</span>
            </Link>
          )}
          
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={24} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="flex items-center p-2 hover:bg-gray-100 rounded"
              >
                <Home size={18} className="mr-2" />
                <span>Home</span>
              </Link>
              <Link 
                to="/menu" 
                className="flex items-center p-2 hover:bg-gray-100 rounded"
              >
                <span>Menu</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              >
                <div className="flex items-center">
                  <ShoppingCart size={18} className="mr-2" />
                  <span>Cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/order-history" 
                    className="flex items-center p-2 hover:bg-gray-100 rounded"
                  >
                    <History size={18} className="mr-2" />
                    <span>Order History</span>
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center w-full p-2 hover:bg-gray-100 rounded text-left"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <User size={18} className="mr-2" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;