import React from 'react';
import { PlusCircle, Tablet as Vegetable, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '../hooks/useMenu';
import { useCart, CartItem } from '../contexts/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      quantity: 1,
    };
    
    addItem(cartItem);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex space-x-1">
          {item.is_vegetarian && (
            <span className="bg-accent-400 text-white p-1 rounded-full" title="Vegetarian">
              <Vegetable size={16} />
            </span>
          )}
          {item.is_spicy && (
            <span className="bg-primary-500 text-white p-1 rounded-full" title="Spicy">
              <Flame size={16} />
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        )}
      </div>
      
      <div className="p-4 pt-0 mt-auto flex items-center justify-between">
        <span className="font-medium text-lg">${item.price.toFixed(2)}</span>
        <button 
          onClick={handleAddToCart}
          className="flex items-center text-sm text-primary-500 hover:text-primary-600 transition-colors"
        >
          <PlusCircle size={20} className="mr-1" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;