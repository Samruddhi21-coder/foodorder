import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Award, ThumbsUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedItems from '../components/FeaturedItems';
import { useMenu } from '../hooks/useMenu';

const HomePage: React.FC = () => {
  const { getFeaturedItems, loading } = useMenu();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Change the page title
    document.title = 'TastyBites - Delicious Food Delivered';
  }, []);

  return (
    <div>
      <HeroSection />
      
      {!loading && <FeaturedItems items={getFeaturedItems()} />}
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-display font-semibold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="text-primary-500">TastyBites</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award size={32} className="text-primary-500" />,
                title: 'Premium Quality',
                description: 'We use only the freshest ingredients to create our delicious dishes.'
              },
              {
                icon: <Clock size={32} className="text-primary-500" />,
                title: 'Fast Delivery',
                description: 'Quick delivery straight to your doorstep, hot and ready to enjoy.'
              },
              {
                icon: <MapPin size={32} className="text-primary-500" />,
                title: 'Wide Coverage',
                description: 'We deliver to multiple areas around the city for your convenience.'
              },
              {
                icon: <ThumbsUp size={32} className="text-primary-500" />,
                title: 'Exceptional Service',
                description: 'Our customers consistently rate our service 4.8/5 stars.'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-card flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-display font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Order?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Browse our menu and enjoy delicious meals delivered right to your doorstep!
            </motion.p>
            <motion.button 
              onClick={() => navigate('/menu')}
              className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              View Our Menu
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;