import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';
import NoteForm from '../components/notes/NoteForm';
import { Spinner, ErrorState } from '../components/ui';
import { notesApi } from '../services/api';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await notesApi.getById(id);
        setNote(data.data);
      } catch {
        setError('Could not load note. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await notesApi.update(id, data);
      toast.success('Note updated');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update note');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-6">
        <HiArrowLeft /> Back
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Edit Note</h1>
        <p className="text-slate-500 text-sm">Embedding will be regenerated if title or content changes.</p>
      </div>

      <div className="card">
        <NoteForm
          defaultValues={note}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditNote;
