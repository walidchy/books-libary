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

  const fetchBooks = async (category = currentCategory, startIndex = 0, append = false, query = searchTerm) => {
    try {
      if (!append) setLoading(true);
      
      // Google Books API with larger dataset
      const maxResults = 40; // Maximum allowed by Google Books API
      let searchQuery = category === 'all' ? 'books' : `subject:${category}`;
      if (query && query.trim() !== '') {
        searchQuery = query;
      }
      
      // Switch to OpenLibrary API due to Google API rate limits
      const response = await axios.get('https://openlibrary.org/search.json', {
        params: {
          q: searchQuery,
          offset: startIndex,
          limit: maxResults
        }
      });

      if (response.data.docs && response.data.docs.length > 0) {
        const processedBooks = response.data.docs.map(doc => {
          return {
            key: doc.key.replace('/works/', ''),
            title: doc.title || 'Untitled',
            authors: doc.author_name || ['Unknown Author'],
            coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '/placeholder-book.png',
            firstPublishYear: doc.first_publish_year || null,
            subjects: doc.subject || [],
            description: doc.first_sentence ? doc.first_sentence[0] : '',
            pageCount: doc.number_of_pages_median || null,
            averageRating: doc.ratings_average || null,
            ratingsCount: doc.ratings_count || 0,
            publisher: doc.publisher ? doc.publisher[0] : '',
            isbn: doc.isbn ? doc.isbn[0] : '',
            previewLink: `https://openlibrary.org${doc.key}`,
            infoLink: `https://openlibrary.org${doc.key}`
          };
        });

        if (append) {
          setBooks(prevBooks => {
            const combined = [...prevBooks, ...processedBooks];
            const seen = new Set();
            return combined.filter(book => {
              if (seen.has(book.key)) return false;
              seen.add(book.key);
              return true;
            });
          });
        } else {
          setBooks(processedBooks);
        }
        
        setTotalItems(response.data.numFound || 0);
        setHasMore(startIndex + maxResults < (response.data.numFound || 0));
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
      fetchBooks(currentCategory, nextStartIndex, true, searchTerm);
    }
  };

  const searchBooks = async (query) => {
    fetchBooks(currentCategory, 0, false, query);
  };

  const filteredBooks = books.filter(book => {
    // searchTerm is already handled by the API, so we only filter by author locally
    const matchesAuthor = filterAuthor === '' || 
      (book.authors && book.authors.some(author => 
        author.toLowerCase().includes(filterAuthor.toLowerCase())
      ));
    return matchesAuthor;
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
