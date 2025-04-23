import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { useOrders, Order } from '../hooks/useOrders';
import { motion } from 'framer-motion';

const OrderHistoryPage: React.FC = () => {
  const { getOrders, loading } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Order History - TastyBites';
    
    const fetchOrders = async () => {
      const orderData = await getOrders();
      setOrders(orderData || []);
    };
    
    fetchOrders();
  }, [getOrders]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'delivering':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800'; // pending
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold mb-8">Order History</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Loading orders...</div>
          </div>
        ) : orders.length > 0 ? (
          <motion.div 
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {orders.map((order, index) => (
              <motion.div 
                key={order.id}
                className="bg-white rounded-lg shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="font-medium">
                      ${order.total_amount.toFixed(2)}
                    </div>
                    
                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      Details <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet. Start ordering delicious food!
            </p>
            <Link 
              to="/menu" 
              className="inline-block px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;