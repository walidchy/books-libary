import React, { useState } from 'react';
import { MagnifyingGlassIcon, UserIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

export const SearchBar = ({ searchTerm, onSearchChange, filterAuthor, onAuthorFilterChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAuthorFocused, setIsAuthorFocused] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Search container with glass morphism */}
      <div className="glass rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Title search */}
          <div className="flex-1 relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="relative">
              <MagnifyingGlassIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                isSearchFocused ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search books by title..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex items-center">
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Author filter */}
          <div className="flex-1 relative group">
            <div className={`absolute inset-0 bg-gradient-to-r from-accent-400 to-primary-400 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            <div className="relative">
              <UserIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                isAuthorFocused ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Filter by author..."
                value={filterAuthor}
                onChange={(e) => onAuthorFilterChange(e.target.value)}
                onFocus={() => setIsAuthorFocused(true)}
                onBlur={() => setIsAuthorFocused(false)}
                className="w-full pl-12 pr-10 py-4 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-200"
              />
              {filterAuthor && (
                <button
                  onClick={() => onAuthorFilterChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Clear author filter"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search tips */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <FunnelIcon className="h-4 w-4" />
            <span>Quick filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Fiction', 'Science', 'History', 'Romance'].map((genre) => (
              <button
                key={genre}
                onClick={() => onSearchChange(genre.toLowerCase())}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-xs font-medium"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active filters display */}
      {(searchTerm || filterAuthor) && (
        <div className="mt-4 flex items-center gap-2 animate-fade-in">
          <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm">
                <MagnifyingGlassIcon className="h-3 w-3" />
                {searchTerm}
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary-900 dark:hover:text-primary-100"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            {filterAuthor && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm">
                <UserIcon className="h-3 w-3" />
                {filterAuthor}
                <button
                  onClick={() => onAuthorFilterChange('')}
                  className="ml-1 hover:text-accent-900 dark:hover:text-accent-100"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
