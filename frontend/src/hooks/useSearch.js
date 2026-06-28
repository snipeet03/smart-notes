import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { notesApi } from '../services/api';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const abortRef = useRef(null);

  const performSearch = useCallback(
    debounce(async (q) => {
      if (!q || q.length < 2) {
        setResults([]);
        setSearching(false);
        return;
      }

      // Cancel in-flight request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setSearching(true);
      setSearchError(null);

      try {
        const { data } = await notesApi.search(q, abortRef.current.signal);
        setResults(data.data || []);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setSearchError('Search failed. Please try again.');
          setResults([]);
        }
      } finally {
        setSearching(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    performSearch(query);
    return () => performSearch.cancel();
  }, [query, performSearch]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchError(null);
  };

  return { query, setQuery, results, searching, searchError, clearSearch };
};
