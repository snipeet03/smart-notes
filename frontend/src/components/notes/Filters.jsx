const STATUSES = [
  { value: '', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const Filters = ({ activeStatus, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {STATUSES.map(({ value, label }) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-150 border ${
          activeStatus === value
            ? 'bg-oats-accent text-white border-oats-accent shadow-sm'
            : 'bg-oats-surface text-oats-ink-secondary border-oats-border hover:border-oats-accent/40 hover:text-oats-accent hover:shadow-sm'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default Filters;
