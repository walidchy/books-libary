import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/BookCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { HeroAnimations } from '../components/HeroAnimations';
import { SparklesIcon, BookOpenIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage = ({ 
  books, 
  loading, 
  searchTerm, 
  setSearchTerm, 
  filterAuthor, 
  setFilterAuthor,
  favorites,
  toggleFavorite,
  searchBooks,
  loadMoreBooks,
  hasMore,
  totalItems
}) => {
  const { t, language } = useLanguage();
  
  const stats = [
    { icon: BookOpenIcon, value: totalItems ? `${totalItems.toLocaleString()}+` : '1,000,000+', label: t('home.booksAvailable') },
    { icon: HeartIcon, value: favorites.length.toString(), label: t('home.yourFavorites') },
    { icon: MagnifyingGlassIcon, value: '30+', label: t('home.categories') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-30"></div>
        
        {/* Lottie Animations */}
        <HeroAnimations />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl opacity-20 animate-float animation-delay-400"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium animate-fade-in">
              <SparklesIcon className="h-4 w-4" />
              <span>{t('home.badge')}</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white animate-fade-up">
              {t('home.title')}
              <span className="block gradient-text mt-2">{t('home.titleHighlight')}</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-up animation-delay-200">
              {t('home.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-up animation-delay-400">
              <button 
                onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                {t('home.startExploring')}
              </button>
              <button className="btn-secondary">
                {t('home.learnMore')}
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center space-y-2 animate-fade-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="inline-flex p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/30">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="py-12 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container-custom">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              searchBooks(value);
            }}
            filterAuthor={filterAuthor}
            onAuthorFilterChange={setFilterAuthor}
          />
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Results header */}
              {books.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {searchTerm || filterAuthor ? t('home.searchResults') : t('home.featuredBooks')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {t('home.showing')} {books.length} {books.length === 1 ? t('home.book') : t('home.books')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-ghost text-sm">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      {t('home.sortBy')}
                    </button>
                    <button className="btn-ghost text-sm">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      {t('home.filter')}
                    </button>
                  </div>
                </div>
              )}

              {/* Books grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
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

              {/* Load More Button */}
              {hasMore && books.length > 0 && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMoreBooks}
                    disabled={loading}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('home.loading')}
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {t('home.loadMore')}
                      </>
                    )}
                  </button>
                  {totalItems && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {t('home.showingOf').replace('{{current}}', books.length).replace('{{total}}', totalItems.toLocaleString())}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!loading && books.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                <BookOpenIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('home.noBooksFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                {t('home.noBooksMessage')}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterAuthor('');
                }}
                className="btn-primary"
              >
                {t('home.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.stayUpdated')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('home.newsletterMessage')}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('home.enterEmail')}
                className="flex-1 input"
              />
              <button type="submit" className="btn-primary">
                {t('home.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
