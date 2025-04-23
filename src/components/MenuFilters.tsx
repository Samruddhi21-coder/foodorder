import React from 'react';
import { Search, Filter, Tablet as Vegetable, Flame } from 'lucide-react';

interface MenuFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    vegetarian: boolean | undefined;
    spicy: boolean | undefined;
  };
  setFilters: (filters: { vegetarian: boolean | undefined; spicy: boolean | undefined }) => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}) => {
  const handleVegetarianToggle = () => {
    setFilters({
      ...filters,
      vegetarian: filters.vegetarian === true ? undefined : true,
    });
  };

  const handleSpicyToggle = () => {
    setFilters({
      ...filters,
      spicy: filters.spicy === true ? undefined : true,
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({ vegetarian: undefined, spicy: undefined });
  };

  const isFiltersActive = searchQuery || filters.vegetarian !== undefined || filters.spicy !== undefined;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6 sticky top-[72px] z-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center text-gray-500 mr-1">
            <Filter size={18} className="mr-1" /> Filters:
          </span>
          
          <button
            onClick={handleVegetarianToggle}
            className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
              filters.vegetarian ? 'bg-accent-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Vegetable size={16} className="mr-1" />
            Vegetarian
          </button>
          
          <button
            onClick={handleSpicyToggle}
            className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
              filters.spicy ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Flame size={16} className="mr-1" />
            Spicy
          </button>
          
          {isFiltersActive && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 ml-2"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;