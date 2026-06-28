import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from 'react-icons/hi';
import { StatusBadge, TagChip } from '../ui';

const NoteCard = ({ note, onDelete }) => {
  const preview = note.content.length > 140
    ? note.content.slice(0, 140) + '…'
    : note.content;

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 animate-fade-in group flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <Link to={`/edit/${note._id}`} className="font-semibold text-slate-800 hover:text-brand-600 transition-colors leading-snug line-clamp-2">
          {note.title}
        </Link>
        <StatusBadge status={note.status} />
      </div>

      {/* Content preview */}
      <p className="text-slate-500 text-sm leading-relaxed">{preview}</p>

      {/* AI summary */}
      {note.summary && (
        <p className="text-xs text-indigo-500 italic border-l-2 border-indigo-200 pl-2">
          {note.summary}
        </p>
      )}

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        <span className="text-xs text-slate-400">
          {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/edit/${note._id}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            title="Edit"
          >
            <HiOutlinePencil />
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>

      {/* Relevance score (shown only in search results) */}
      {note.relevanceScore !== undefined && (
        <div className="text-xs text-slate-400">
          Relevance: <span className="font-medium text-brand-500">{Math.round(note.relevanceScore * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
