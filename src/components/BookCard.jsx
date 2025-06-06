import React, { useState } from 'react';
import { HeartIcon, StarIcon, CalendarIcon, UserIcon, BookOpenIcon, EyeIcon, DocumentTextIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useReadingLists } from '../contexts/ReadingListsContext';
import { AddToListModal } from './AddToListModal';

export const BookCard = ({ book, onFavorite, isFavorite, onRemoveFromList, showRemoveButton }) => {
  const { t } = useLanguage();
  const { getBookLists } = useReadingLists();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showAddToList, setShowAddToList] = useState(false);
  const bookLists = getBookLists(book.key);
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarSolidIcon className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="group card-interactive h-full flex flex-col relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
        
        {/* Image container */}
        <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton"></div>
          )}
          
          {/* Book cover image */}
          {!imageError ? (
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <BookOpenIcon className="h-20 w-20 text-gray-400 dark:text-gray-600" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            {showRemoveButton ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromList();
                }}
                className="p-2.5 bg-red-500 text-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                aria-label={t('lists.removeFromList')}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            ) : (
              <>
                {/* Add to list button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddToList(true);
                  }}
                  className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  aria-label={t('lists.addToList')}
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                
                {/* Favorite button */}
                {onFavorite && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite(book);
                    }}
                    className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 group/btn"
                    aria-label={isFavorite ? t('book.removeFromFavorites') : t('book.addToFavorites')}
                  >
                    <div className="relative">
                      {isFavorite ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500 animate-scale-in" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover/btn:text-red-500 transition-colors" />
                      )}
                    </div>
                  </button>
                )}
              </>
            )}
            
            {/* Preview button */}
            {book.previewLink && (
              <a 
                href={book.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                aria-label={t('book.previewBook')}
              >
                <EyeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </a>
            )}
          </div>
          
          {/* List indicators */}
          {bookLists.length > 0 && !showRemoveButton && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[60%] z-20">
              {bookLists.slice(0, 3).map((list) => (
                <span
                  key={list.id}
                  className="px-2 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300"
                  title={list.name}
                >
                  {list.icon}
                </span>
              ))}
              {bookLists.length > 3 && (
                <span className="px-2 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300">
                  +{bookLists.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Category badge */}
          {book.subjects && book.subjects[0] && (
            <div className="absolute bottom-3 left-3 z-20">
              <span className="badge badge-primary backdrop-blur-sm bg-primary-600/90 text-white text-xs">
                {book.subjects[0].split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {book.title}
          </h3>
          
          {/* Author */}
          <div className="flex items-center gap-2 mb-3">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {book.authors.join(', ')}
            </p>
          </div>
          
          {/* Rating */}
          {book.averageRating ? (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(book.averageRating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {book.averageRating.toFixed(1)} {book.ratingsCount > 0 && `(${book.ratingsCount})`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(0)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('book.noRatingsYet')}
              </span>
            </div>
          )}
          
          {/* Description preview */}
          {book.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {book.description}
            </p>
          )}
          
          {/* Publication info */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
            {book.firstPublishYear && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('book.published')} {book.firstPublishYear}
                </p>
              </div>
            )}
            {book.pageCount && (
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.pageCount} {t('book.pages')}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick view button (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {book.infoLink ? (
            <a 
              href={book.infoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full btn-primary py-2 text-sm text-center"
            >
              {t('book.viewDetails')}
            </a>
          ) : (
            <button className="w-full btn-primary py-2 text-sm">
              {t('book.quickView')}
            </button>
          )}
        </div>
      </div>

      {/* Add to List Modal */}
      {showAddToList && (
        <AddToListModal
          book={book}
          onClose={() => setShowAddToList(false)}
        />
      )}
    </>
  );
};
