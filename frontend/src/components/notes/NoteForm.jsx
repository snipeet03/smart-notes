import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiX } from 'react-icons/hi';
import { TagChip, Spinner } from '../ui';

const STATUS_OPTIONS = ['todo', 'in-progress', 'done'];

const NoteForm = ({ defaultValues, onSubmit, submitting, submitLabel = 'Save' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(defaultValues?.tags || []);

  const addTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().toLowerCase();
      if (val && !tags.includes(val) && tags.length < 10) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="label">Title <span className="text-oats-accent">*</span></label>
        <input
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 100, message: 'Max 100 characters' },
          })}
          placeholder="Give your note a title…"
          className="input font-serif text-base focus:ring-oats-accent/5"
        />
        {errors.title && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.title.message}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="label">Content <span className="text-oats-accent">*</span></label>
        <textarea
          {...register('content', {
            required: 'Content is required',
            maxLength: { value: 5000, message: 'Max 5000 characters' },
          })}
          placeholder="Start writing your thoughts here…"
          rows={10}
          className="input font-serif text-base leading-relaxed resize-none bg-oats-bg/30 focus:bg-oats-surface"
        />
        {errors.content && <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.content.message}</p>}
      </div>

      {/* Grid for Status and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select {...register('status')} className="input cursor-pointer py-2.5 font-medium bg-oats-surface">
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'todo' ? 'To Do' : s === 'in-progress' ? 'In Progress' : 'Done'}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="label">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[28px]">
            {tags.map((tag) => <TagChip key={tag} tag={tag} onRemove={removeTag} />)}
            {tags.length === 0 && <span className="text-xs text-oats-ink-tertiary italic">No tags added yet</span>}
          </div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Add tag and press Enter or comma…"
            className="input"
          />
          <p className="text-[11px] text-oats-ink-secondary mt-1.5">Press Enter or comma to create a new tag tag</p>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t border-oats-border/40">
        <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          {submitting && <Spinner size="sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
