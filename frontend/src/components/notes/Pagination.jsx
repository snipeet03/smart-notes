import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;
  const { page, pages, total } = pagination;

  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-oats-border/40">
      <p className="text-sm text-oats-ink-secondary font-medium">
        Page <span className="font-semibold text-oats-ink-primary">{page}</span> of <span className="font-semibold text-oats-ink-primary">{pages}</span>
        <span className="hidden sm:inline"> · {total} notes total</span>
      </p>

      <div className="flex gap-1.5 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-full border border-oats-border text-oats-ink-secondary disabled:opacity-30 hover:border-oats-accent/40 hover:text-oats-accent hover:bg-oats-accent-light transition-all flex items-center justify-center w-9 h-9"
        >
          <HiChevronLeft className="text-lg" />
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold border transition-all ${
                p === page
                  ? 'bg-oats-accent text-white border-oats-accent shadow-sm'
                  : 'border-oats-border bg-oats-surface text-oats-ink-secondary hover:border-oats-accent/40 hover:text-oats-accent hover:shadow-sm'
              }`}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="p-2 rounded-full border border-oats-border text-oats-ink-secondary disabled:opacity-30 hover:border-oats-accent/40 hover:text-oats-accent hover:bg-oats-accent-light transition-all flex items-center justify-center w-9 h-9"
        >
          <HiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
