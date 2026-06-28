import { HiOutlineExclamation } from 'react-icons/hi';

const DeleteModal = ({ isOpen, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-oats-surface rounded-2xl border border-oats-border/80 shadow-2xl p-6 max-w-sm w-full animate-fade-in">
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 bg-red-50 rounded-full text-red-500 shrink-0">
            <HiOutlineExclamation className="text-2xl" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-oats-ink-primary mb-1">Delete Note</h3>
            <p className="text-sm text-oats-ink-secondary leading-relaxed">This action cannot be undone. The note and its semantic embedding will be permanently removed.</p>
          </div>
        </div>

        <div className="flex gap-2.5 justify-end">
          <button onClick={onCancel} className="btn-secondary text-xs font-semibold uppercase tracking-wider py-2 px-4" disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger text-xs font-semibold uppercase tracking-wider py-2 px-4" disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
