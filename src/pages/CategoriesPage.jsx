import React, { useState } from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { BookCard } from '../components/BookCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ArrowLeftIcon, Squares2X2Icon, ViewColumnsIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export const CategoriesPage = ({ books, loading, favorites, toggleFavorite }) => {
  const { t } = useLanguage();
  
  const categories = [
    {
      key: 'science',
      name: t('categories.science'),
      description: t('categories.scienceDesc'),
      count: '1,200+'
    },
    {
      key: 'fiction',
      name: t('categories.fiction'),
      description: t('categories.fictionDesc'),
      count: '2,500+'
    },
    {
      key: 'history',
      name: t('categories.history'),
      description: t('categories.historyDesc'),
      count: '800+'
    },
    {
      key: 'romance',
      name: t('categories.romance'),
      description: t('categories.romanceDesc'),
      count: '1,500+'
    },
    {
      key: 'technology',
      name: t('categories.technology'),
      description: t('categories.technologyDesc'),
      count: '600+'
    },
    {
      key: 'education',
      name: t('categories.education'),
      description: t('categories.educationDesc'),
      count: '900+'
    }
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, compact

  const handleCategorySelect = async (categoryKey) => {
    setSelectedCategory(categoryKey);
    setCategoryLoading(true);
    
    // Simulate API call for category-specific books
    setTimeout(() => {
      // Filter books based on category (this is a simulation)
      const filtered = books.filter(book => 
        book.subjects.some(subject => 
          subject.toLowerCase().includes(categoryKey.toLowerCase())
        )
      );
      setCategoryBooks(filtered);
      setCategoryLoading(false);
    }, 1000);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCategoryBooks([]);
  };

  const selectedCategoryData = categories.find(cat => cat.key === selectedCategory);

  if (selectedCategory) {
    return (
      <div className="min-h-screen">
        {/* Category Header */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-12 -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="container-custom">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors mb-6 group"
            >
              <ArrowLeftIcon className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t('categories.backToCategories')}</span>
            </button>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-gray-800 shadow-lg">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${
                  selectedCategory === 'science' ? 'from-blue-500 to-cyan-500' :
                  selectedCategory === 'fiction' ? 'from-purple-500 to-pink-500' :
                  selectedCategory === 'history' ? 'from-amber-500 to-orange-500' :
                  selectedCategory === 'romance' ? 'from-red-500 to-pink-500' :
                  selectedCategory === 'technology' ? 'from-green-500 to-emerald-500' :
                  'from-indigo-500 to-purple-500'
                } bg-opacity-10`}>
                  <Squares2X2Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h1 className="text-3xl font-bold gradient-text">
                  {selectedCategoryData?.name} {t('categories.books')}
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {selectedCategoryData?.description}
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="container-custom mt-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {t('categories.foundBooks').replace('{{count}}', categoryBooks.length)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="Grid view"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label="List view"
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {categoryLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }
            `}>
              {categoryBooks.map((book, index) => (
                <div
                  key={book.key}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <BookCard 
                    book={book}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.some(fav => fav.key === book.key)}
                  />
                </div>
              ))}
            </div>
          )}

          {!categoryLoading && categoryBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                <Squares2X2Icon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('categories.noBooksFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                {t('categories.noBooksInCategory')}
              </p>
              <button 
                onClick={handleBackToCategories}
                className="btn-primary"
              >
                {t('categories.browseOtherCategories')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fade-up">
            {t('categories.browseByCategory').split(' ').map((word, index) => 
              index === 2 ? <span key={index} className="gradient-text">{word}</span> : word + ' '
            )}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-up animation-delay-200">
            {t('categories.exploreCollection')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.key}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard 
                category={category}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-center text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              {t('categories.cantFindBook')}
            </h2>
            <p className="text-lg mb-8 text-white/90">
              {t('categories.cantFindBookDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
                {t('categories.advancedSearch')}
              </button>
              <button className="btn bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 px-8 py-3">
                {t('categories.requestBook')}
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
