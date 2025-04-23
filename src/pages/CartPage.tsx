import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    document.title = 'Your Cart - TastyBites';
  }, []);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/menu" 
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Menu
          </Link>
        </div>
        
        <motion.h1 
          className="text-3xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Your Cart
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div 
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              {items.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                  <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Link 
                    to="/menu" 
                    className="inline-block px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-medium">Items ({items.length})</h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100 p-6">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div 
            className="lg:w-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <OrderSummary onCheckout={handleCheckout} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;