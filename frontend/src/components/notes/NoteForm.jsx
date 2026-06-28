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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="label">Title *</label>
        <input
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 100, message: 'Max 100 characters' },
          })}
          placeholder="Note title…"
          className="input"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="label">Content *</label>
        <textarea
          {...register('content', {
            required: 'Content is required',
            maxLength: { value: 5000, message: 'Max 5000 characters' },
          })}
          placeholder="Write your note here…"
          rows={8}
          className="input resize-none"
        />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>

      {/* Status */}
      <div>
        <label className="label">Status</label>
        <select {...register('status')} className="input">
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
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => <TagChip key={tag} tag={tag} onRemove={removeTag} />)}
        </div>
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Type a tag and press Enter…"
          className="input"
        />
        <p className="text-xs text-slate-400 mt-1">Press Enter or comma to add a tag</p>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
          {submitting && <Spinner size="sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
