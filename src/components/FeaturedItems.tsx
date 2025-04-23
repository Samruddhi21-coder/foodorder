import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FoodCard from './FoodCard';
import { MenuItem } from '../hooks/useMenu';

interface FeaturedItemsProps {
  items: MenuItem[];
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Featured Dishes
          </h2>
          <Link 
            to="/menu" 
            className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
          >
            View Full Menu <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;