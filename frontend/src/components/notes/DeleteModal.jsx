import { HiOutlineExclamation } from 'react-icons/hi';

const DeleteModal = ({ isOpen, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 rounded-full">
            <HiOutlineExclamation className="text-red-500 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Delete note?</h3>
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-secondary text-sm" disabled={loading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger text-sm" disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
