import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import NoteCard from '../components/notes/NoteCard';
import SearchBar from '../components/notes/SearchBar';
import Filters from '../components/notes/Filters';
import Pagination from '../components/notes/Pagination';
import DeleteModal from '../components/notes/DeleteModal';
import { EmptyState, ErrorState, NoteCardSkeleton } from '../components/ui';
import { useNotes } from '../hooks/useNotes';
import { useSearch } from '../hooks/useSearch';

const Home = () => {
  const { notes, pagination, loading, error, fetchNotes, deleteNote } = useNotes();
  const { query, setQuery, results, searching, searchError, clearSearch } = useSearch();

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!query) fetchNotes({ page, limit: 9, status: status || undefined });
  }, [page, status, query, fetchNotes]);

  const handleStatusChange = (s) => {
    setStatus(s);
    setPage(1);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    const ok = await deleteNote(deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (ok) fetchNotes({ page, limit: 9, status: status || undefined });
  };

  const isSearchMode = query.length >= 2;
  const displayNotes = isSearchMode ? results : notes;
  const isLoading = isSearchMode ? searching : loading;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">My Notes</h1>
        <p className="text-slate-500 text-sm">Organize your thoughts with AI-powered search</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={query}
          onChange={(v) => { setQuery(v); if (!v) clearSearch(); }}
          onClear={clearSearch}
          searching={searching}
        />
        {!isSearchMode && (
          <Filters activeStatus={status} onChange={handleStatusChange} />
        )}
      </div>

      {/* Search error */}
      {searchError && <p className="text-red-500 text-sm mb-4">{searchError}</p>}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <NoteCardSkeleton key={i} />)}
        </div>
      ) : error && !isSearchMode ? (
        <ErrorState message={error} onRetry={() => fetchNotes({ page, limit: 9 })} />
      ) : displayNotes.length === 0 ? (
        <EmptyState
          title={isSearchMode ? 'No results found' : 'No notes yet'}
          description={isSearchMode ? `No notes matched "${query}"` : 'Create your first note to get started'}
          action={
            !isSearchMode && (
              <Link to="/create" className="btn-primary flex items-center gap-1.5 text-sm">
                <HiPlus /> New Note
              </Link>
            )
          }
        />
      ) : (
        <>
          {isSearchMode && (
            <p className="text-sm text-slate-500 mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''} for <span className="font-medium text-slate-700">"{query}"</span>
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayNotes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={setDeleteId} />
            ))}
          </div>

          {!isSearchMode && (
            <Pagination pagination={pagination} onPageChange={setPage} />
          )}
        </>
      )}

      <DeleteModal
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
};

export default Home;
