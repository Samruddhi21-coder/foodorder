import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">TastyBites</h3>
            <p className="mb-4 text-gray-300">
              Delicious food delivered right to your doorstep. We're committed to providing you with the best culinary experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/order-history" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact & Hours</h3>
            <p className="text-gray-300 mb-2">123 Main Street, Foodville</p>
            <p className="text-gray-300 mb-2">Phone: (555) 123-4567</p>
            <p className="text-gray-300 mb-4">Email: info@tastybites.com</p>
            
            <h4 className="text-lg font-medium mb-2">Hours</h4>
            <p className="text-gray-300 mb-1">Mon-Fri: 11:00 AM - 10:00 PM</p>
            <p className="text-gray-300 mb-1">Sat-Sun: 10:00 AM - 11:00 PM</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} TastyBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;