"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumeModal from './resume-modal';

interface NavbarClientProps {
  pathname: string;
  navItems: Array<{ name: string; path: string; type: 'scroll' | 'modal' | string }>;
}

const NavbarClient = ({ pathname, navItems }: NavbarClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle active section detection
      // Get all section IDs from navItems and filter out non-hash links
      const sectionIds = navItems
        .filter(item => item.path.startsWith('#'))
        .map(item => item.path.replace('#', ''));
      
      // Find the current active section based on scroll position
      let currentActive = '';
      let minDistance = Number.MAX_VALUE;
      
      // Find which section is closest to the top of the viewport
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distanceFromTop = Math.abs(rect.top - 100); // 100px from top of viewport
          
          // Update if this section is closest to the viewport top
          if (distanceFromTop < minDistance && rect.top <= 300) {
            minDistance = distanceFromTop;
            currentActive = id;
          }
        }
      });

      if (currentActive) {
        setActiveSection('#' + currentActive);
      }
    };

    // Run once to set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle nav click with modal support
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, type?: string) => {
    e.preventDefault();
    
    // Close mobile menu
    setIsOpen(false);

    // Check if this is a modal type navigation
    if (type === 'modal') {
      setIsResumeModalOpen(true);
      return;
    }

    // Only apply smooth scrolling for hash links
    if (path.startsWith('#')) {
      const targetId = path.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Immediately set active section for better UX
        setActiveSection(path);
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar height
          behavior: 'smooth'
        });
        
        // Update URL without refreshing the page
        window.history.pushState(null, '', path);
      }
    } else {
      // For non-hash links, use normal navigation
      window.location.href = path;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md backdrop-blur-sm dark:bg-gray-900/90' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Hamburger Menu Button - Mobile */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-black hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div id='name' className="flex-shrink-0 flex items-center">
              <Link 
                href="#name" 
                className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300"
                onClick={(e) => handleNavClick(e, '#name', 'scroll')}
              >
                Mayank Joshi
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path, item.type)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path, item.type)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  activeSection === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default NavbarClient; 