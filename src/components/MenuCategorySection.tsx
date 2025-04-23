import React from 'react';
import { MenuCategory, MenuItem } from '../hooks/useMenu';
import FoodCard from './FoodCard';

interface MenuCategorySectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({ category, items }) => {
  if (items.length === 0) return null;

  return (
    <section id={`category-${category.id}`} className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-display font-semibold">{category.name}</h2>
          <div className="ml-4 flex-grow h-px bg-gray-200"></div>
        </div>
        
        {category.description && (
          <p className="text-gray-600 mb-6 max-w-3xl">{category.description}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCategorySection;