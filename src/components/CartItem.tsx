import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  editable?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, editable = true }) => {
  const { updateQuantity, removeItem, updateSpecialInstructions } = useCart();
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState(item.special_instructions || '');

  const handleUpdateInstructions = () => {
    updateSpecialInstructions(item.id, instructions);
    setShowInstructions(false);
  };

  return (
    <div className="flex flex-col md:flex-row border-b border-gray-200 py-4">
      <div className="flex-shrink-0 w-full md:w-24 h-24 mb-3 md:mb-0 md:mr-4">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.name}</h3>
          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        
        <div className="mt-1 text-sm text-gray-500">
          ${item.price.toFixed(2)} each
        </div>
        
        {item.special_instructions && !showInstructions && (
          <div className="mt-1 text-sm text-gray-600 italic">
            "{item.special_instructions}"
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {editable ? (
            <>
              <div className="flex items-center border rounded overflow-hidden">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-sm text-gray-600 hover:text-primary-500 transition-colors"
                >
                  {showInstructions ? 'Cancel' : (item.special_instructions ? 'Edit note' : 'Add note')}
                </button>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-600">
              Quantity: {item.quantity}
            </div>
          )}
        </div>
        
        {showInstructions && (
          <div className="mt-3">
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add special instructions..."
              className="w-full p-2 border rounded text-sm"
              rows={2}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button 
                onClick={() => setShowInstructions(false)}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateInstructions}
                className="px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;