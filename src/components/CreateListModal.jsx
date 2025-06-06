import React, { useState } from 'react';
import { useReadingLists } from '../contexts/ReadingListsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EMOJI_OPTIONS = ['📚', '📖', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📑', '🔖', '🎯', '⭐', '💡', '🎨', '🌟'];

export const CreateListModal = ({ onClose }) => {
  const { createList } = useReadingLists();
  const { t } = useLanguage();
  const [listName, setListName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📚');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      createList(listName.trim(), selectedEmoji);
      onClose();
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('lists.createNewList')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* List name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('lists.listName')}
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder={t('lists.listNamePlaceholder')}
              className="input w-full"
              autoFocus
              required
            />
          </div>

          {/* Emoji selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('lists.chooseIcon')}
            </label>
            <div className="grid grid-cols-8 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-2 text-2xl rounded-lg transition-all ${
                    selectedEmoji === emoji
                      ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('lists.preview')}</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedEmoji}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {listName || t('lists.yourListName')}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={!listName.trim()}
              className="btn-primary flex-1"
            >
              {t('lists.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
