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
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-oats-ink-secondary hover:text-oats-accent transition-colors mb-8">
        <HiArrowLeft className="text-sm" /> Back
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <h1 className="text-3xl font-serif font-bold text-oats-ink-primary">New Note</h1>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-oats-accent bg-oats-accent-light px-2.5 py-0.5 rounded-full border border-oats-accent/20">
            <HiSparkles className="text-xs" /> AI-enhanced
          </span>
        </div>
        <p className="text-oats-ink-secondary text-sm">A vector embedding will be generated automatically to enable semantic search.</p>
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
