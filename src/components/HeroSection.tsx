import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Delicious Food,<br />
            <span className="text-primary-400">Delivered to Your Door</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the finest cuisine from the comfort of your home. 
            Browse our extensive menu and place your order with just a few clicks.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to="/menu" 
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-md font-medium transition-colors"
            >
              View Menu
              <ArrowRight size={18} className="ml-2" />
            </Link>
            
            <Link 
              to="/auth" 
              className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border border-white rounded-md font-medium transition-colors"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;