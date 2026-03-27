import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/BookCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { HeroAnimations } from '../components/HeroAnimations';
import { motion } from 'framer-motion';
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
  const [sortBy, setSortBy] = useState('relevance');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return (a.authors[0] || '').localeCompare(b.authors[0] || '');
      case 'year':
        return (b.firstPublishYear || 0) - (a.firstPublishYear || 0);
      default:
        return 0; // Relevance (default fetched order)
    }
  });
  
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
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>{t('home.badge')}</span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1 
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white"
            >
              {t('home.title')}
              <span className="block gradient-text mt-2">{t('home.titleHighlight')}</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              {t('home.subtitle')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <button 
                onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                {t('home.startExploring')}
              </button>
              <button className="btn-secondary">
                {t('home.learnMore')}
              </button>
            </motion.div>
          </motion.div>
          
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
                  <div className="flex gap-2 items-center">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    >
                      <option value="relevance">{t('home.sortBy') || 'Sort By'}</option>
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="year">Year (Newest)</option>
                    </select>
                    <button 
                      onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                      className="btn-ghost text-sm flex items-center"
                    >
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
                {sortedBooks.map((book, index) => (
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
                  searchBooks('');
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
            {isSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-md mx-auto p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-2xl border border-green-200 dark:border-green-800/50 flex items-center justify-center gap-3 shadow-lg"
              >
                <div className="bg-green-100 dark:bg-green-800 rounded-full p-1.5 flex-shrink-0">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-lg">Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  
                  try {
                    await fetch("https://formsubmit.co/ajax/chyboubwalid@gmail.com", {
                      method: "POST",
                      headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                      },
                      body: JSON.stringify({
                        email: email,
                        _subject: "New Library App Subscriber!"
                      })
                    });
                  } catch (error) {
                    console.error("FormSubmit error:", error);
                  } finally {
                    setIsSubscribed(true);
                  }
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('home.enterEmail')}
                  required
                  className="flex-1 px-5 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all"
                />
                <button type="submit" className="btn-primary sm:px-8">
                  {t('home.subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
