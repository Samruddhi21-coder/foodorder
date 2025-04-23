import React, { useState, useEffect } from 'react';
import { useMenu, MenuCategory } from '../hooks/useMenu';
import MenuCategorySection from '../components/MenuCategorySection';
import MenuFilters from '../components/MenuFilters';

const MenuPage: React.FC = () => {
  const { categories, getItemsByCategory, loading, error, searchItems, filterItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: undefined as boolean | undefined,
    spicy: undefined as boolean | undefined,
  });
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Menu - TastyBites';
    
    // Set first category as active by default once loaded
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // Smooth scroll to category section
  const scrollToCategory = (categoryId: number) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse text-gray-500">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-red-500">
          Error loading menu. Please try again later.
        </div>
      </div>
    );
  }

  // Filter and search items
  const getFilteredItems = (categoryId: number) => {
    let items = getItemsByCategory(categoryId);
    
    if (searchQuery) {
      items = searchItems(searchQuery);
      if (categoryId) {
        items = items.filter(item => item.category_id === categoryId);
      }
    }
    
    if (filters.vegetarian !== undefined || filters.spicy !== undefined) {
      items = filterItems(filters);
      if (categoryId) {
        items = items.filter(item => item.category_id === categoryId);
      }
    }
    
    return items;
  };

  // If we're searching or filtering, we want to show all categories that have matching items
  const shouldShowCategory = (category: MenuCategory) => {
    if (!searchQuery && filters.vegetarian === undefined && filters.spicy === undefined) {
      return true;
    }
    
    const items = getFilteredItems(category.id);
    return items.length > 0;
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Menu</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore our wide range of delicious dishes, prepared with the freshest ingredients and delivered right to your doorstep.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <MenuFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-[144px]">
              <h3 className="font-medium text-lg mb-4">Categories</h3>
              <nav className="space-y-1">
                {categories.map(category => (
                  shouldShowCategory(category) && (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  )
                ))}
              </nav>
            </div>
          </div>
          
          {/* Menu Sections */}
          <div className="flex-grow">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No menu categories found
              </div>
            ) : (
              <div className="space-y-12">
                {categories.map(category => (
                  shouldShowCategory(category) && (
                    <MenuCategorySection 
                      key={category.id} 
                      category={category} 
                      items={getFilteredItems(category.id)} 
                    />
                  )
                ))}
                
                {categories.every(category => !shouldShowCategory(category)) && (
                  <div className="text-center py-12 text-gray-500">
                    No items found matching your search or filters
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;