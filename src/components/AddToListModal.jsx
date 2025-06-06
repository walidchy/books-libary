import React, { useState } from 'react';
import { useReadingLists } from '../contexts/ReadingListsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { XMarkIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';

export const AddToListModal = ({ book, onClose }) => {
  const { lists, addBookToList, removeBookFromList, isBookInList, createList } = useReadingLists();
  const { t } = useLanguage();
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newListName, setNewListName] = useState('');

  // Get translated name for default lists
  const getListDisplayName = (list) => {
    if (list.isDefault) {
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
    return list.name;
  };

  const handleToggleList = (listId) => {
    if (isBookInList(listId, book.key)) {
      removeBookFromList(listId, book.key);
    } else {
      addBookToList(listId, book);
    }
  };

  const handleCreateAndAdd = () => {
    if (newListName.trim()) {
      const newList = createList(newListName.trim());
      addBookToList(newList.id, book);
      setNewListName('');
      setShowCreateNew(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('lists.addToList')}
        </h2>
        
        {/* Book info */}
        <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-12 h-16 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {book.authors?.join(', ')}
            </p>
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => handleToggleList(list.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                isBookInList(list.id, book.key)
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                  : 'bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-900/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{list.icon}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getListDisplayName(list)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {list.books.length} {t('lists.books')}
                  </p>
                </div>
              </div>
              {isBookInList(list.id, book.key) && (
                <CheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              )}
            </button>
          ))}
        </div>

        {/* Create new list */}
        {!showCreateNew ? (
          <button
            onClick={() => setShowCreateNew(true)}
            className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
          >
            <PlusIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{t('lists.createNew')}</span>
          </button>
        ) : (
          <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder={t('lists.listNamePlaceholder')}
              className="input w-full mb-2"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCreateAndAdd()}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowCreateNew(false);
                  setNewListName('');
                }}
                className="btn-secondary text-sm flex-1"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim()}
                className="btn-primary text-sm flex-1"
              >
                {t('lists.createAndAdd')}
              </button>
            </div>
          </div>
        )}

        {/* Done button */}
        <button
          onClick={onClose}
          className="w-full mt-4 btn-primary"
        >
          {t('common.done')}
        </button>
      </div>
    </div>
  );
};
