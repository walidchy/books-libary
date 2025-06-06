import React, { createContext, useContext, useState, useEffect } from 'react';

const ReadingListsContext = createContext();

const DEFAULT_LISTS = [
  { id: 'favorites', name: 'Favorites', icon: '❤️', isDefault: true, books: [] },
  { id: 'want-to-read', name: 'Want to Read', icon: '📚', isDefault: true, books: [] },
  { id: 'currently-reading', name: 'Currently Reading', icon: '📖', isDefault: true, books: [] },
  { id: 'finished', name: 'Finished', icon: '✅', isDefault: true, books: [] }
];

export const ReadingListsProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('readingLists');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Migrate existing favorites
    const existingFavorites = localStorage.getItem('favorites');
    if (existingFavorites) {
      const favoritesData = JSON.parse(existingFavorites);
      const defaultListsWithFavorites = [...DEFAULT_LISTS];
      defaultListsWithFavorites[0].books = favoritesData;
      return defaultListsWithFavorites;
    }
    
    return DEFAULT_LISTS;
  });

  useEffect(() => {
    localStorage.setItem('readingLists', JSON.stringify(lists));
  }, [lists]);

  const createList = (name, icon = '📋') => {
    const newList = {
      id: `custom-${Date.now()}`,
      name,
      icon,
      isDefault: false,
      books: []
    };
    setLists(prev => [...prev, newList]);
    return newList;
  };

  const deleteList = (listId) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  };

  const renameList = (listId, newName) => {
    setLists(prev => prev.map(list => 
      list.id === listId ? { ...list, name: newName } : list
    ));
  };

  const addBookToList = (listId, book) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        const bookExists = list.books.some(b => b.key === book.key);
        if (!bookExists) {
          return { ...list, books: [...list.books, book] };
        }
      }
      return list;
    }));
  };

  const removeBookFromList = (listId, bookKey) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return { ...list, books: list.books.filter(b => b.key !== bookKey) };
      }
      return list;
    }));
  };

  const isBookInList = (listId, bookKey) => {
    const list = lists.find(l => l.id === listId);
    return list ? list.books.some(b => b.key === bookKey) : false;
  };

  const getBookLists = (bookKey) => {
    return lists.filter(list => list.books.some(b => b.key === bookKey));
  };

  const moveBookBetweenLists = (bookKey, fromListId, toListId) => {
    const book = lists.find(l => l.id === fromListId)?.books.find(b => b.key === bookKey);
    if (book) {
      removeBookFromList(fromListId, bookKey);
      addBookToList(toListId, book);
    }
  };

  return (
    <ReadingListsContext.Provider value={{
      lists,
      createList,
      deleteList,
      renameList,
      addBookToList,
      removeBookFromList,
      isBookInList,
      getBookLists,
      moveBookBetweenLists
    }}>
      {children}
    </ReadingListsContext.Provider>
  );
};

export const useReadingLists = () => {
  const context = useContext(ReadingListsContext);
  if (!context) {
    throw new Error('useReadingLists must be used within a ReadingListsProvider');
  }
  return context;
};
