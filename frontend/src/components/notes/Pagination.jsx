import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;
  const { page, pages, total } = pagination;

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-slate-500">
        Page <span className="font-medium">{page}</span> of <span className="font-medium">{pages}</span>
        <span className="hidden sm:inline"> · {total} total</span>
      </p>

      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-brand-300 hover:text-brand-600 transition-colors"
        >
          <HiChevronLeft />
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
                p === page
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'border-slate-200 text-slate-600 hover:border-brand-300'
              }`}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-brand-300 hover:text-brand-600 transition-colors"
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
