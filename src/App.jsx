import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ReadingListsPage } from './pages/ReadingListsPage';
import { ListDetailPage } from './pages/ListDetailPage';
import ContactPage from './pages/ContactPage';
import { useBooks } from './hooks/useBooks';
import { useDarkMode } from './hooks/useDarkMode';
import { ReadingListsProvider } from './contexts/ReadingListsContext';

function App() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { 
    books, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    filterAuthor, 
    setFilterAuthor,
    currentCategory,
    setCurrentCategory,
    fetchBooks,
    searchBooks,
    loadMoreBooks,
    hasMore,
    totalItems
  } = useBooks();

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.some(fav => fav.key === book.key);
      if (isCurrentlyFavorite) {
        return prev.filter(fav => fav.key !== book.key);
      } else {
        return [...prev, book];
      }
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-gray-50 dark:from-background-dark dark:via-background-dark dark:to-gray-900">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-error-light/10 dark:bg-error-dark/10 border border-error/20 rounded-2xl p-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <ReadingListsProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-gray-50 dark:from-background-dark dark:via-background-dark dark:to-gray-900">
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="relative z-10">
          <div className="animate-fade-in" key={location.pathname}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    books={books}
                    loading={loading}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterAuthor={filterAuthor}
                    setFilterAuthor={setFilterAuthor}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    searchBooks={searchBooks}
                    loadMoreBooks={loadMoreBooks}
                    hasMore={hasMore}
                    totalItems={totalItems}
                  />
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <CategoriesPage 
                    books={books}
                    loading={loading}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <FavoritesPage 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                } 
              />
              <Route 
                path="/lists" 
                element={<ReadingListsPage />} 
              />
              <Route 
                path="/lists/:listId" 
                element={<ListDetailPage />} 
              />
              <Route 
                path="/about" 
                element={<AboutPage />} 
              />
              <Route 
                path="/contact" 
                element={<ContactPage />} 
              />
            </Routes>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="relative z-10 mt-24 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 Digital Library. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ReadingListsProvider>
  );
}

export default App;
