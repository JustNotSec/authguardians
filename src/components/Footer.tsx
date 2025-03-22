
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Secure your applications with advanced authentication and license management solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products/authentication" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Authentication</Link></li>
              <li><Link to="/products/license" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">License Manager</Link></li>
              <li><Link to="/products/security" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Application Security</Link></li>
              <li><Link to="/products/analytics" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">User Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link to="/guides" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Guides</Link></li>
              <li><Link to="/api" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">API Reference</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link to="/legal" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} KeyAuth. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
