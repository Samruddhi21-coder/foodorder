import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight, Home } from 'lucide-react';
import { useOrders, OrderDetails } from '../hooks/useOrders';
import { motion } from 'framer-motion';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderDetails, loading } = useOrders();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Order Confirmation - TastyBites';
    
    const fetchOrder = async () => {
      if (orderId) {
        const orderData = await getOrderDetails(parseInt(orderId));
        setOrder(orderData);
      }
    };
    
    fetchOrder();
  }, [orderId, getOrderDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the order you're looking for. It may have been removed or never existed.
          </p>
          <Link
            to="/order-history"
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString();
  const orderTime = new Date(order.created_at).toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          className="bg-white rounded-lg shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-green-50 p-8 text-center border-b">
            <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your order and will begin processing it right away.
            </p>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-4">Order Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Order Number</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="font-medium">
                    {orderDate} at {orderTime}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Order Status</p>
                  <div className="flex items-center">
                    <Clock size={16} className="text-primary-500 mr-1" />
                    <span className="font-medium capitalize">{order.status}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="font-medium capitalize">{order.payment_method}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-4">Delivery Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Delivery Address</p>
                  <p className="font-medium">{order.address}</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium">{order.phone_number}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4">Item</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.order_items.map((item) => (
                      <tr key={item.id}>
                        <td className="p-4">
                          <div className="flex items-center">
                            {item.menu_item.image_url && (
                              <img 
                                src={item.menu_item.image_url} 
                                alt={item.menu_item.name} 
                                className="w-12 h-12 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.menu_item.name}</p>
                              {item.special_instructions && (
                                <p className="text-sm text-gray-500 italic">
                                  "{item.special_instructions}"
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">{item.quantity}</td>
                        <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="p-4 font-medium" colSpan={2}>
                        Total
                      </td>
                      <td className="p-4 text-right font-bold">
                        ${order.total_amount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
              >
                <Home size={18} className="mr-2" />
                Return to Home
              </button>
              
              <button
                onClick={() => navigate('/order-history')}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
              >
                View Order History
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;