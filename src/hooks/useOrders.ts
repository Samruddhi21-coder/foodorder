import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

export type Order = {
  id: number;
  user_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  address: string | null;
  phone_number: string | null;
  payment_method: string;
};

export type OrderDetails = Order & {
  order_items: {
    id: number;
    menu_item_id: number;
    quantity: number;
    price: number;
    special_instructions: string | null;
    menu_item: {
      name: string;
      image_url: string | null;
    };
  }[];
};

export const useOrders = () => {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);

  const createOrder = async (orderDetails: {
    address: string;
    phone_number: string;
    payment_method: string;
  }) => {
    if (!user) {
      toast.error('You must be logged in to place an order');
      return null;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    try {
      setLoading(true);

      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_amount: totalAmount,
            status: 'pending',
            address: orderDetails.address,
            phone_number: orderDetails.phone_number,
            payment_method: orderDetails.payment_method,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
        special_instructions: item.special_instructions || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Clear the cart
      clearCart();

      toast.success('Order placed successfully!');
      return order;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error(error.message || 'Failed to place order');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
      return data;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'Failed to load orders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = async (orderId: number) => {
    if (!user) return null;

    try {
      setLoading(true);
      
      // Get order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (orderError) throw orderError;

      // Get order items with menu item details
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          id,
          menu_item_id,
          quantity,
          price,
          special_instructions,
          menu_item:menu_items(name, image_url)
        `)
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;

      const orderDetails: OrderDetails = {
        ...orderData,
        order_items: orderItems as OrderDetails['order_items'],
      };

      setCurrentOrder(orderDetails);
      return orderDetails;
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      toast.error(error.message || 'Failed to load order details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    orders,
    currentOrder,
    createOrder,
    getOrders,
    getOrderDetails,
  };
};