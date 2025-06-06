import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [currentCategory, setCurrentCategory] = useState('fiction');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (category = currentCategory, startIndex = 0, append = false) => {
    try {
      if (!append) setLoading(true);
      
      // Google Books API with larger dataset
      const maxResults = 40; // Maximum allowed by Google Books API
      const searchQuery = category === 'all' ? 'books' : `subject:${category}`;
      
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: searchQuery,
          startIndex: startIndex,
          maxResults: maxResults,
          orderBy: 'relevance',
          printType: 'books',
          langRestrict: 'en'
        }
      });

      if (response.data.items) {
        const processedBooks = response.data.items.map(item => {
          const volumeInfo = item.volumeInfo;
          return {
            key: item.id,
            title: volumeInfo.title || 'Untitled',
            authors: volumeInfo.authors || ['Unknown Author'],
            coverUrl: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
                     volumeInfo.imageLinks?.smallThumbnail?.replace('http:', 'https:') || 
                     '/placeholder-book.png',
            firstPublishYear: volumeInfo.publishedDate ? 
              new Date(volumeInfo.publishedDate).getFullYear() : null,
            subjects: volumeInfo.categories || [],
            description: volumeInfo.description || '',
            pageCount: volumeInfo.pageCount || null,
            averageRating: volumeInfo.averageRating || null,
            ratingsCount: volumeInfo.ratingsCount || 0,
            publisher: volumeInfo.publisher || '',
            isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || '',
            previewLink: volumeInfo.previewLink || '',
            infoLink: volumeInfo.infoLink || ''
          };
        });

        if (append) {
          setBooks(prevBooks => [...prevBooks, ...processedBooks]);
        } else {
          setBooks(processedBooks);
        }
        
        setTotalItems(response.data.totalItems || 0);
        setHasMore(startIndex + maxResults < (response.data.totalItems || 0));
        setCurrentPage(Math.floor(startIndex / maxResults));
      } else {
        if (!append) setBooks([]);
        setHasMore(false);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
      if (!append) setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentCategory]);

  const loadMoreBooks = () => {
    if (!loading && hasMore) {
      const nextStartIndex = (currentPage + 1) * 40;
      fetchBooks(currentCategory, nextStartIndex, true);
    }
  };

  const searchBooks = async (query) => {
    if (!query.trim()) {
      fetchBooks(currentCategory);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
          maxResults: 40,
          orderBy: 'relevance',
          printType: 'books'
        }
      });

      if (response.data.items) {
        const processedBooks = response.data.items.map(item => {
          const volumeInfo = item.volumeInfo;
          return {
            key: item.id,
            title: volumeInfo.title || 'Untitled',
            authors: volumeInfo.authors || ['Unknown Author'],
            coverUrl: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
                     volumeInfo.imageLinks?.smallThumbnail?.replace('http:', 'https:') || 
                     '/placeholder-book.png',
            firstPublishYear: volumeInfo.publishedDate ? 
              new Date(volumeInfo.publishedDate).getFullYear() : null,
            subjects: volumeInfo.categories || [],
            description: volumeInfo.description || '',
            pageCount: volumeInfo.pageCount || null,
            averageRating: volumeInfo.averageRating || null,
            ratingsCount: volumeInfo.ratingsCount || 0,
            publisher: volumeInfo.publisher || '',
            isbn: volumeInfo.industryIdentifiers?.[0]?.identifier || '',
            previewLink: volumeInfo.previewLink || '',
            infoLink: volumeInfo.infoLink || ''
          };
        });
        setBooks(processedBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Error searching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = filterAuthor === '' || 
      book.authors.some(author => 
        author.toLowerCase().includes(filterAuthor.toLowerCase())
      );
    return matchesTitle && matchesAuthor;
  });

  return {
    books: filteredBooks,
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
  };
};
