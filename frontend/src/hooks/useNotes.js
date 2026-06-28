import { useState, useCallback } from 'react';
import { notesApi } from '../services/api';
import toast from 'react-hot-toast';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await notesApi.getAll(params);
      setNotes(data.data.notes);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      await notesApi.delete(id);
      toast.success('Note deleted');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
      return false;
    }
  }, []);

  return { notes, pagination, loading, error, fetchNotes, deleteNote };
};
