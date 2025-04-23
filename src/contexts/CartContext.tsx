import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
  special_instructions?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateSpecialInstructions: (id: number, instructions: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        toast.success(`Updated ${newItem.name} quantity`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`Added ${newItem.name} to cart`);
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateSpecialInstructions = (id: number, instructions: string) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, special_instructions: instructions } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity,
      updateSpecialInstructions,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};