const { pipeline } = require('@xenova/transformers');

/**
 * Embedding service using sentence-transformers/all-MiniLM-L6-v2 via @xenova/transformers.
 * This runs entirely locally — no API key, no cost, no rate limits.
 * The model is downloaded once and cached on first use (~25MB).
 */
class EmbeddingService {
  constructor() {
    this.extractor = null;
    this.modelName = 'Xenova/all-MiniLM-L6-v2';
    this.isLoading = false;
    this.loadPromise = null;
  }

  async _loadModel() {
    if (this.extractor) return;
    // Prevent concurrent initializations
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      console.log('⏳ Loading embedding model (first run downloads ~25MB)...');
      this.extractor = await pipeline('feature-extraction', this.modelName, {
        quantized: true, // Use quantized model for faster inference
      });
      console.log('✅ Embedding model loaded');
    })();

    return this.loadPromise;
  }

  /**
   * Generates a 384-dimensional embedding vector for the given text.
   * Falls back to an empty array if the model fails to load.
   */
  async generateEmbedding(text) {
    try {
      await this._loadModel();

      const output = await this.extractor(text, {
        pooling: 'mean',
        normalize: true,
      });

      // Convert tensor to plain JS array
      return Array.from(output.data);
    } catch (error) {
      console.error('Embedding generation failed:', error.message);
      return [];
    }
  }

  /**
   * Combines title + content for a richer embedding representation.
   */
  async generateNoteEmbedding(title, content) {
    const combined = `${title}. ${content}`.slice(0, 1000); // Cap for performance
    return this.generateEmbedding(combined);
  }
}

// Singleton — shared across the app
module.exports = new EmbeddingService();
