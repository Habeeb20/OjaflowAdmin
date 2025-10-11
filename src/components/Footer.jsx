// Footer.tsx
import React from 'react';
import { Package, Mail, Phone, MapPin, Github, Twitter, Linkedin, Globe } from 'lucide-react';



const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-700 dark:text-gray-300">
                Ojaflow
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-xs">
              Streamline your inventory management with powerful tools designed for modern businesses. Track, manage, and optimize your stock effortlessly.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Github className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Globe className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('inventory')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Inventory Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('analytics')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Analytics & Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('suppliers')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Supplier Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('orders')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation('about')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('careers')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('blog')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('press')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Press Kit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('partners')}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Partners
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  support@ojaflow.com
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Business Avenue<br />
                  Lagos, Nigeria
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3">
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('help')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('documentation')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    Documentation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('contact')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-gray-300 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                © {currentYear} Ojaflow. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleNavigation('privacy')}
                  className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavigation('terms')}
                  className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleNavigation('cookies')}
                  className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors duration-200"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;