import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiSparkles } from 'react-icons/hi';
import NoteForm from '../components/notes/NoteForm';
import { notesApi } from '../services/api';

const CreateNote = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await notesApi.create(data);
      toast.success('Note created with AI enrichment ✨');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create note');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors mb-6">
        <HiArrowLeft /> Back
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-800">New Note</h1>
          <span className="inline-flex items-center gap-1 text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            <HiSparkles /> AI-enhanced
          </span>
        </div>
        <p className="text-slate-500 text-sm">An embedding will be generated for semantic search.</p>
      </div>

      <div className="card">
        <NoteForm
          defaultValues={{ status: 'todo' }}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Create Note"
        />
      </div>
    </div>
  );
};

export default CreateNote;
