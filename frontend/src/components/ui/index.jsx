// Spinner
export const Spinner = ({ size = 'md' }) => {
  const s = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';
  return (
    <div className={`${s} border-2 border-oats-accent border-t-transparent rounded-full animate-spin`} />
  );
};

// Status badge
const STATUS_STYLES = {
  'todo': 'bg-oats-sunken text-oats-ink-secondary border border-oats-border/60',
  'in-progress': 'bg-amber-50 text-amber-800 border border-amber-200/50',
  'done': 'bg-oats-accent-light text-oats-accent border border-oats-accent/20',
};

const STATUS_LABELS = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLES[status] || STATUS_STYLES.todo}`}>
    {STATUS_LABELS[status] || status}
  </span>
);

// Tag chip
export const TagChip = ({ tag, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-oats-sunken/80 text-oats-ink-secondary text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-oats-border/60 hover:bg-oats-border/20 transition-all">
    <span className="text-oats-ink-tertiary">#</span>{tag}
    {onRemove && (
      <button onClick={() => onRemove(tag)} className="ml-0.5 text-oats-ink-tertiary hover:text-red-500 font-bold transition-colors line-height-none">×</button>
    )}
  </span>
);

// Empty state
export const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center bg-oats-surface border border-oats-border/50 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
    <div className="text-3xl mb-4 bg-oats-accent-light p-4 rounded-full w-16 h-16 flex items-center justify-center text-oats-accent">🗒️</div>
    <h3 className="text-xl font-serif font-bold text-oats-ink-primary mb-1">{title}</h3>
    <p className="text-oats-ink-secondary text-sm max-w-sm mb-6">{description}</p>
    {action}
  </div>
);

// Error state
export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center bg-oats-surface border border-oats-border/50 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
    <div className="text-3xl mb-3 bg-red-50 p-4 rounded-full w-16 h-16 flex items-center justify-center text-red-500">⚠️</div>
    <h3 className="text-lg font-serif font-bold text-oats-ink-primary mb-1">Something went wrong</h3>
    <p className="text-oats-ink-secondary text-sm max-w-sm mb-5">{message}</p>
    {onRetry && <button onClick={onRetry} className="btn-secondary text-xs font-semibold uppercase tracking-wider">Try again</button>}
  </div>
);

// Loading skeleton
export const NoteCardSkeleton = () => (
  <div className="card animate-pulse border-oats-border/50">
    <div className="h-5 bg-oats-sunken rounded-lg w-3/4 mb-4" />
    <div className="h-3.5 bg-oats-sunken rounded w-full mb-2" />
    <div className="h-3.5 bg-oats-sunken rounded w-5/6 mb-5" />
    <div className="flex gap-2">
      <div className="h-5 w-14 bg-oats-sunken rounded-full" />
      <div className="h-5 w-14 bg-oats-sunken rounded-full" />
    </div>
  </div>
);
