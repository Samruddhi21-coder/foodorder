import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type MenuCategory = Database['public']['Tables']['menu_categories']['Row'];

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('menu_categories')
        .select('*')
        .order('id');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData);

      // Fetch menu items
      const { data: itemsData, error: itemsError } = await supabase
        .from('menu_items')
        .select('*')
        .order('category_id, name');

      if (itemsError) throw itemsError;
      setMenuItems(itemsData);
    } catch (err: any) {
      console.error('Error fetching menu:', err);
      setError(err.message || 'Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  // Get menu items by category
  const getItemsByCategory = (categoryId: number) => {
    return menuItems.filter(item => item.category_id === categoryId);
  };

  // Get featured items
  const getFeaturedItems = () => {
    return menuItems.filter(item => item.is_featured);
  };

  // Search menu items
  const searchItems = (query: string) => {
    if (!query.trim()) return menuItems;
    
    const lowerQuery = query.toLowerCase();
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
  };

  // Filter menu items
  const filterItems = ({ vegetarian, spicy }: { vegetarian?: boolean; spicy?: boolean }) => {
    return menuItems.filter(item => {
      if (vegetarian !== undefined && item.is_vegetarian !== vegetarian) return false;
      if (spicy !== undefined && item.is_spicy !== spicy) return false;
      return true;
    });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    menuItems,
    categories,
    loading,
    error,
    getItemsByCategory,
    getFeaturedItems,
    searchItems,
    filterItems,
    refreshMenu: fetchMenu,
  };
};