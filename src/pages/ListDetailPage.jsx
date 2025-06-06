import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReadingLists } from '../contexts/ReadingListsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BookCard } from '../components/BookCard';
import { ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export const ListDetailPage = () => {
  const { listId } = useParams();
  const { lists, removeBookFromList } = useReadingLists();
  const { t } = useLanguage();
  
  const list = lists.find(l => l.id === listId);

  // Get translated name for default lists
  const getListDisplayName = () => {
    if (list?.isDefault) {
      switch (list.id) {
        case 'favorites':
          return t('lists.favorites');
        case 'want-to-read':
          return t('lists.wantToRead');
        case 'currently-reading':
          return t('lists.currentlyReading');
        case 'finished':
          return t('lists.finished');
        default:
          return list.name;
      }
    }
    return list?.name || '';
  };

  if (!list) {
    return (
      <div className="min-h-screen py-12">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('lists.listNotFound')}
          </h1>
          <Link to="/lists" className="btn-primary">
            {t('lists.backToLists')}
          </Link>
        </div>
      </div>
    );
  }

  const handleRemoveBook = (bookKey) => {
    removeBookFromList(listId, bookKey);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Back button */}
        <Link
          to="/lists"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t('lists.backToLists')}
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-5xl">{list.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {getListDisplayName()}
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {list.books.length} {list.books.length === 1 ? t('lists.book') : t('lists.books')}
          </p>
        </div>

        {/* Books Grid */}
        {list.books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.books.map((book, index) => (
              <div
                key={book.key}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookCard 
                  book={book}
                  onRemoveFromList={() => handleRemoveBook(book.key)}
                  showRemoveButton={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
              <BookOpenIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('lists.emptyList')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {t('lists.emptyListMessage')}
            </p>
            <Link to="/" className="btn-primary">
              {t('lists.browseBooks')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
