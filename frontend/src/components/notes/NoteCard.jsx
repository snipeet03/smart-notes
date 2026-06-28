import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from 'react-icons/hi';
import { StatusBadge, TagChip } from '../ui';

const NoteCard = ({ note, onDelete }) => {
  const preview = note.content.length > 140
    ? note.content.slice(0, 140) + '…'
    : note.content;

  return (
    <div className="card hover:shadow-lg hover:border-oats-accent/20 transition-all duration-200 animate-fade-in group flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <Link to={`/edit/${note._id}`} className="font-serif text-lg font-bold text-oats-ink-primary hover:text-oats-accent transition-colors leading-tight line-clamp-2">
          {note.title}
        </Link>
        <StatusBadge status={note.status} />
      </div>

      {/* Content preview */}
      <p className="text-oats-ink-secondary text-sm leading-relaxed line-clamp-3">{preview}</p>

      {/* AI summary */}
      {note.summary && (
        <div className="bg-oats-accent-light/50 border border-oats-accent/15 rounded-xl p-3 text-xs text-oats-accent leading-relaxed flex gap-2 items-start transition-all">
          <span className="text-[14px] leading-none mt-0.5">✨</span>
          <div className="flex-1">
            <span className="font-bold uppercase tracking-wider text-[9px] block mb-0.5 text-oats-accent-hover">AI Summary</span>
            <p className="italic text-oats-accent-hover/90">{note.summary}</p>
          </div>
        </div>
      )}

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {note.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-oats-border/40 mt-auto">
        <span className="text-xs text-oats-ink-tertiary font-medium">
          {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>

        <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/edit/${note._id}`}
            className="p-1.5 rounded-lg text-oats-ink-tertiary hover:text-oats-accent hover:bg-oats-accent-light transition-colors"
            title="Edit"
          >
            <HiOutlinePencil className="text-base" />
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="p-1.5 rounded-lg text-oats-ink-tertiary hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <HiOutlineTrash className="text-base" />
          </button>
        </div>
      </div>

      {/* Relevance score (shown only in search results) */}
      {note.relevanceScore !== undefined && (
        <div className="text-xs text-oats-ink-tertiary pt-1 border-t border-oats-border/20 flex justify-between items-center">
          <span>Search Relevance</span>
          <span className="font-semibold text-oats-accent bg-oats-accent-light px-1.5 py-0.5 rounded text-[10px]">{Math.round(note.relevanceScore * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
