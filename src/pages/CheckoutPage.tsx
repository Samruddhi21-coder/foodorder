import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, AlertTriangle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../hooks/useOrders';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, subtotal } = useCart();
  const { user } = useAuth();
  const { createOrder, loading } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'cash',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  React.useEffect(() => {
    document.title = 'Checkout - TastyBites';
    
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (subtotal === 0) {
      navigate('/cart');
      return;
    }
    
    const order = await createOrder({
      address: formData.address,
      phone_number: formData.phone,
      payment_method: formData.paymentMethod,
    });
    
    if (order) {
      navigate(`/order-confirmation/${order.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/cart" 
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Cart
          </Link>
        </div>
        
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-medium mb-4">Delivery Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">
                    Delivery Address*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-md ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full delivery address"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-md ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                    className="h-5 w-5 text-primary-500"
                  />
                  <Banknote size={24} className="mx-3 text-gray-600" />
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="h-5 w-5 text-primary-500"
                  />
                  <CreditCard size={24} className="mx-3 text-gray-600" />
                  <div>
                    <span className="font-medium">Credit Card</span>
                    <p className="text-xs text-gray-500">Pay securely online</p>
                  </div>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md flex items-start">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  This is a demo application. No actual payment will be processed. For card payments, no real payment information will be collected.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-medium mb-4">Order Review</h2>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} editable={false} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <OrderSummary showCheckoutButton={false} />
              
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading || subtotal === 0}
                  className={`w-full py-3 font-medium rounded transition-colors ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }`}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                By placing your order, you agree to our{' '}
                <a href="#" className="text-primary-500 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-500 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;