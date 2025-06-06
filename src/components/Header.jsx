import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon, BookOpenIcon, Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { HomeIcon, Squares2X2Icon, HeartIcon, InformationCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export const Header = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: t('header.home'), icon: HomeIcon },
    { path: '/categories', label: t('header.categories'), icon: Squares2X2Icon },
    { path: '/lists', label: t('header.myLists'), icon: HeartIcon },
    { path: '/about', label: t('header.about'), icon: InformationCircleIcon },
    { path: '/contact', label: t('header.contact'), icon: EnvelopeIcon }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-white dark:bg-gray-900'
      } border-b border-gray-200/50 dark:border-gray-700/50`}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 rtl:space-x-reverse group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <BookOpenIcon className="relative h-8 w-8 md:h-10 md:w-10 text-primary-600 transform group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold gradient-text">
                  {language === 'ar' ? 'المكتبة الرقمية' : 'Digital Library'}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                  {language === 'ar' ? 'اكتشف كتباً مذهلة' : 'Discover Amazing Books'}
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 rounded-xl flex items-center space-x-2 rtl:space-x-reverse transition-all duration-200 ${
                    isActiveRoute(path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                  {isActiveRoute(path) && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                aria-label="Toggle language"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative flex items-center space-x-1">
                  <LanguageIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {language === 'ar' ? 'EN' : 'AR'}
                  </span>
                </div>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
                aria-label={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {isDarkMode ? (
                  <SunIcon className="relative h-5 w-5 text-yellow-500 transform group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <MoonIcon className="relative h-5 w-5 text-gray-600 transform group-hover:-rotate-12 transition-transform duration-500" />
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-x-0 top-16 md:top-20 z-40 md:hidden transform transition-all duration-300 ease-out ${
        isMobileMenuOpen 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl">
          <nav className="container-custom py-4 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActiveRoute(path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {isActiveRoute(path) && (
                  <div className="ml-auto rtl:mr-auto rtl:ml-0 h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Language toggle in mobile menu */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl w-full text-left rtl:text-right text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <LanguageIcon className="h-5 w-5" />
              <span className="font-medium">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};
