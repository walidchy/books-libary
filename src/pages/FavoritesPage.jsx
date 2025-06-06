import React, { useState } from 'react';
import { BookCard } from '../components/BookCard';
import { HeartIcon, BookOpenIcon, TrashIcon, ShareIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded'); // dateAdded, title, author, year
  const [showShareModal, setShowShareModal] = useState(false);

  // Filter favorites based on search term
  const filteredFavorites = favorites.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort favorites based on selected option
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return (a.authors[0] || '').localeCompare(b.authors[0] || '');
      case 'year':
        return (b.firstPublishYear || 0) - (a.firstPublishYear || 0);
      default:
        return 0; // Keep original order for dateAdded
    }
  });

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(book => toggleFavorite(book));
    }
  };

  const handleExport = () => {
    const data = favorites.map(book => ({
      title: book.title,
      authors: book.authors.join(', '),
      year: book.firstPublishYear
    }));
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-favorite-books.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-8 rounded-full">
              <HeartIcon className="h-24 w-24 text-red-400 dark:text-red-500" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Favorites Yet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start building your personal library by adding books to your favorites. Click the heart icon on any book to save it here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="btn-primary inline-flex items-center justify-center">
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Browse Books
            </a>
            <a href="/categories" className="btn-secondary">
              Explore Categories
            </a>
          </div>
          
          {/* Decorative elements */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto opacity-50">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 shadow-lg animate-fade-in">
            <HeartSolidIcon className="h-8 w-8 text-red-500 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              My Favorite Books
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 animate-fade-in animation-delay-200">
            You have <span className="font-semibold text-primary-600 dark:text-primary-400">{favorites.length}</span> book{favorites.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>

        {/* Search and Action Bar */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-200"
              />
            </div>
            
            {/* Sort and Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-white focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20"
              >
                <option value="dateAdded">Date Added</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="year">Year</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="btn-ghost text-sm"
                  aria-label="Share favorites"
                >
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button
                  onClick={handleExport}
                  className="btn-ghost text-sm"
                  aria-label="Export favorites"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export
                </button>
                {favorites.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="btn-ghost text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Clear all favorites"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No favorites match your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map((book, index) => (
              <div
                key={book.key}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookCard 
                  book={book}
                  onFavorite={toggleFavorite}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}

        {/* Reading Stats */}
        {favorites.length > 0 && (
          <div className="mt-16 p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Your Reading Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{favorites.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Books Saved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {[...new Set(favorites.flatMap(b => b.authors))].length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Different Authors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {[...new Set(favorites.flatMap(b => b.subjects || []))].length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Genres Explored</div>
              </div>
            </div>
          </div>
        )}

        {/* Pro Tip */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-4">
            <HeartSolidIcon className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pro Tip
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your favorites are automatically saved to your browser. You can access them anytime, even offline! Use the export feature to backup your collection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share Your Favorites</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Share your favorite books collection with friends!
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                  setShowShareModal(false);
                }}
                className="flex-1 btn-primary"
              >
                Copy Link
              </button>
              <button 
                onClick={() => setShowShareModal(false)}
                className="flex-1 btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
