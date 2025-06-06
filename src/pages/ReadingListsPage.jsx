import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReadingLists } from '../contexts/ReadingListsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PlusIcon, BookOpenIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { CreateListModal } from '../components/CreateListModal';
import { ListCard } from '../components/ListCard';

export const ReadingListsPage = () => {
  const { lists, deleteList, renameList } = useReadingLists();
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingList, setEditingList] = useState(null);

  const handleDeleteList = (listId) => {
    if (window.confirm(t('lists.confirmDelete'))) {
      deleteList(listId);
    }
  };

  const handleRenameList = (listId, newName) => {
    renameList(listId, newName);
    setEditingList(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('lists.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('lists.subtitle')}
          </p>
        </div>

        {/* Create New List Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            {t('lists.createNew')}
          </button>
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onEdit={() => setEditingList(list)}
              onDelete={() => handleDeleteList(list.id)}
              isEditing={editingList?.id === list.id}
              onSaveEdit={(newName) => handleRenameList(list.id, newName)}
              onCancelEdit={() => setEditingList(null)}
            />
          ))}
        </div>

      {/* Empty State */}
      {lists.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
            <BookOpenIcon className="h-12 w-12 text-gray-400" />
          </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('lists.noLists')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {t('lists.noListsMessage')}
            </p>
          </div>
        )}
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <CreateListModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
