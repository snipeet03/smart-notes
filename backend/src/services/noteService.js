const Note = require('../models/Note');
const embeddingService = require('../embeddings/embeddingService');
const groqService = require('./groqService');
const { cosineSimilarity, keywordMatchScore, computeRankingScore } = require('../utils/cosineSimilarity');

/**
 * All business logic for notes.
 * Controllers stay thin by delegating everything here.
 */
class NoteService {
  /**
   * Creates a note, generates its embedding, and optionally enriches it with Groq.
   */
  async createNote(data) {
    const { title, content, tags, status } = data;

    // Run embedding + AI enrichment in parallel for speed
    const [embedding, aiData] = await Promise.all([
      embeddingService.generateNoteEmbedding(title, content),
      groqService.enrichNote(title, content),
    ]);

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      status: status || 'todo',
      embedding,
      summary: aiData?.summary || '',
      keywords: aiData?.keywords || [],
    });

    // Return without embedding field (not useful to client)
    return this._stripEmbedding(note.toObject());
  }

  /**
   * Returns paginated notes with optional status/tag filters.
   */
  async getNotes({ page = 1, limit = 10, status, tags }) {
    const filter = {};
    if (status) filter.status = status;
    if (tags) {
      const tagList = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim());
      filter.tags = { $in: tagList };
    }

    const skip = (page - 1) * limit;
    const [notes, total] = await Promise.all([
      Note.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Note.countDocuments(filter),
    ]);

    return {
      notes,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getNoteById(id) {
    return Note.findById(id);
  }

  /**
   * Updates a note and regenerates its embedding if title/content changed.
   */
  async updateNote(id, data) {
    const existing = await Note.findById(id).select('+embedding');
    if (!existing) return null;

    const titleChanged = data.title && data.title !== existing.title;
    const contentChanged = data.content && data.content !== existing.content;

    let embedding = existing.embedding;
    let aiData = null;

    if (titleChanged || contentChanged) {
      const newTitle = data.title || existing.title;
      const newContent = data.content || existing.content;

      [embedding, aiData] = await Promise.all([
        embeddingService.generateNoteEmbedding(newTitle, newContent),
        groqService.enrichNote(newTitle, newContent),
      ]);
    }

    const updates = {
      ...data,
      embedding,
      ...(aiData && { summary: aiData.summary, keywords: aiData.keywords }),
    };

    const updated = await Note.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return updated ? this._stripEmbedding(updated.toObject()) : null;
  }

  async deleteNote(id) {
    return Note.findByIdAndDelete(id);
  }

  /**
   * Semantic search pipeline:
   * 1. Optionally expand query with Groq
   * 2. Generate query embedding
   * 3. Fetch all notes with embeddings
   * 4. Score each note: 80% cosine sim + 20% keyword match
   * 5. Filter by threshold and return ranked results
   */
  async searchNotes(query, limit = 10) {
    const [expandedQuery, queryTerms] = await Promise.all([
      groqService.expandSearchQuery(query),
      Promise.resolve(query.toLowerCase().split(/\s+/).filter(Boolean)),
    ]);

    const queryEmbedding = await embeddingService.generateEmbedding(expandedQuery);

    // Fetch notes with embeddings included
    const notes = await Note.find({}).select('+embedding');

    if (!notes.length) return [];

    const scored = notes
      .map((note) => {
        const embSim = queryEmbedding.length
          ? cosineSimilarity(queryEmbedding, note.embedding)
          : 0;

        const kwScore = keywordMatchScore(queryTerms, [
          ...note.keywords,
          ...note.tags,
          ...note.title.toLowerCase().split(/\s+/),
        ]);

        const score = computeRankingScore(embSim, kwScore);
        return { note, score };
      })
      .filter(({ score }) => score > 0.25) // Relevance threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scored.map(({ note, score }) => ({
      ...this._stripEmbedding(note.toObject()),
      relevanceScore: Math.round(score * 100) / 100,
    }));
  }

  /** Removes the embedding array before sending to client */
  _stripEmbedding(noteObj) {
    const { embedding, ...rest } = noteObj;
    return rest;
  }
}

module.exports = new NoteService();
