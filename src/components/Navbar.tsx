
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Moon, Sun 
} from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => {
  return (
    <Link
      to={to}
      className={`text-sm relative px-3 py-2 rounded-md transition-all duration-200 ${
        isActive 
          ? 'text-blue-600 font-medium'
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-fade-in" />
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const checkActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'Pricing', path: '/pricing' },
    { title: 'Documentation', path: '/docs' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="mr-2" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} isActive={checkActive(link.path)}>
                {link.title}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="text-sm">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="text-sm bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 space-y-3 pb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md transition-colors ${
                checkActive(link.path) 
                  ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Log In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
