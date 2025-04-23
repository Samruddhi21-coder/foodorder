import React from 'react';
import { useCart } from '../contexts/CartContext';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  showCheckoutButton = true,
  onCheckout 
}) => {
  const { subtotal, totalItems } = useCart();
  
  // Calculate additional costs
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 font-medium flex justify-between">
          <span>Total</span>
          <span className="text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {showCheckoutButton && subtotal > 0 && (
        <button
          onClick={onCheckout}
          className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded transition-colors"
        >
          Proceed to Checkout
        </button>
      )}
      
      {subtotal === 0 && (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default OrderSummary;