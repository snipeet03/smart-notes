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
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
          activeStatus === value
            ? 'bg-brand-500 text-white border-brand-500'
            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default Filters;
