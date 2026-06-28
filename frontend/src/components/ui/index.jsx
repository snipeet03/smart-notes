// Spinner
export const Spinner = ({ size = 'md' }) => {
  const s = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';
  return (
    <div className={`${s} border-2 border-brand-500 border-t-transparent rounded-full animate-spin`} />
  );
};

// Status badge
const STATUS_STYLES = {
  'todo': 'bg-slate-100 text-slate-600',
  'in-progress': 'bg-amber-50 text-amber-700 border border-amber-200',
  'done': 'bg-green-50 text-green-700 border border-green-200',
};

const STATUS_LABELS = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.todo}`}>
    {STATUS_LABELS[status] || status}
  </span>
);

// Tag chip
export const TagChip = ({ tag, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-600 text-xs font-medium px-2 py-0.5 rounded-full border border-brand-100">
    #{tag}
    {onRemove && (
      <button onClick={() => onRemove(tag)} className="ml-0.5 hover:text-brand-800 transition-colors">×</button>
    )}
  </span>
);

// Empty state
export const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-5xl mb-4">📝</div>
    <h3 className="text-lg font-semibold text-slate-700 mb-1">{title}</h3>
    <p className="text-slate-500 text-sm mb-4">{description}</p>
    {action}
  </div>
);

// Error state
export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-4xl mb-3">⚠️</div>
    <p className="text-slate-600 mb-4">{message}</p>
    {onRetry && <button onClick={onRetry} className="btn-secondary text-sm">Try again</button>}
  </div>
);

// Loading skeleton
export const NoteCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
    <div className="h-3 bg-slate-100 rounded w-full mb-2" />
    <div className="h-3 bg-slate-100 rounded w-2/3 mb-4" />
    <div className="flex gap-2">
      <div className="h-5 w-14 bg-slate-100 rounded-full" />
      <div className="h-5 w-14 bg-slate-100 rounded-full" />
    </div>
  </div>
);
