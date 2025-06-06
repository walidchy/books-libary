import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ListCard = ({ list, onEdit, onDelete, isEditing, onSaveEdit, onCancelEdit }) => {
  const { t } = useLanguage();
  const [editName, setEditName] = useState(list.name);

  const handleSave = () => {
    if (editName.trim()) {
      onSaveEdit(editName.trim());
    }
  };

  // Get translated name for default lists
  const getListDisplayName = () => {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link 
        to={`/lists/${list.id}`}
        className="block p-6 pb-3"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{list.icon}</span>
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onClick={(e) => e.preventDefault()}
                className="input text-lg font-semibold"
                autoFocus
              />
            ) : (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {getListDisplayName()}
              </h3>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('lists.books')}</span>
            <span className="font-semibold text-gray-900 dark:text-white">{list.books.length}</span>
          </div>
          
          {/* Book previews */}
          {list.books.length > 0 && (
            <div className="flex -space-x-2 mt-3">
              {list.books.slice(0, 4).map((book, index) => (
                <img
                  key={book.key}
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-8 h-12 rounded object-cover border-2 border-white dark:border-gray-800"
                  style={{ zIndex: 4 - index }}
                />
              ))}
              {list.books.length > 4 && (
                <div className="w-8 h-12 rounded bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    +{list.books.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-6 pb-4 flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <CheckIcon className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditName(list.name);
                onCancelEdit();
              }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            {!list.isDefault && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit();
                  }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  title={t('lists.edit')}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  title={t('lists.delete')}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
