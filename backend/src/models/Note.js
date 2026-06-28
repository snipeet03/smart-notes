const mongoose = require('mongoose');

/**
 * Note schema with embedding field for vector search.
 * Indexes on title, tags, status improve query performance.
 */
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    tags: {
      type: [String],
      default: [],
      set: (tags) => tags.map((t) => t.toLowerCase().trim()),
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    summary: {
      type: String,
      default: '',
    },
    keywords: {
      type: [String],
      default: [],
    },
    // Stores the vector embedding for semantic search
    embedding: {
      type: [Number],
      default: [],
      select: false, // Exclude from default queries for performance
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound text index for fallback substring search
noteSchema.index({ title: 'text', content: 'text' });
noteSchema.index({ tags: 1 });
noteSchema.index({ status: 1 });
noteSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);
