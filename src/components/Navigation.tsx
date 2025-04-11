
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Award, BookOpen, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
  { id: 'certificates', label: 'Certificates', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> }
];

interface NavigationProps {
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveLocalSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveLocalSection(sectionId);
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "py-2 glass" : "py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gradient cursor-pointer"
          onClick={() => handleSectionChange('home')}
        >
          Portfolio
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              data-section={item.id}
              className={cn(
                "text-sm font-medium transition-colors relative py-2 px-1",
                activeSection === item.id 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              <span>{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-foreground p-2 hover:bg-secondary/50 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full md:hidden glass"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  data-section={item.id}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg transition-colors",
                    activeSection === item.id 
                      ? "bg-primary/20 text-primary" 
                      : "hover:bg-secondary/50"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
