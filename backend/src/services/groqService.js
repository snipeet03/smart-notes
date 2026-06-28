const Groq = require('groq-sdk');

/**
 * Groq service for AI-powered note enrichment.
 * Search still works if Groq is unavailable — this is purely additive.
 */
class GroqService {
  constructor() {
    this.client = process.env.GROQ_API_KEY
      ? new Groq({ apiKey: process.env.GROQ_API_KEY })
      : null;
    this.model = 'llama-3.3-70b-versatile';
  }

  get isAvailable() {
    return !!this.client;
  }

  /**
   * Generates a short summary and relevant keywords for a note.
   * Returns null gracefully on failure so the note still saves.
   */
  async enrichNote(title, content) {
    if (!this.isAvailable) return null;

    try {
      const prompt = `Analyze this note and respond ONLY with valid JSON (no markdown, no explanation):
{
  "summary": "<one sentence summary, max 150 chars>",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Note Title: ${title}
Note Content: ${content.slice(0, 2000)}`;

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.3,
      });

      const raw = completion.choices[0]?.message?.content?.trim();
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Groq enrichment skipped:', error.message);
      return null;
    }
  }

  /**
   * Expands a short search query into richer semantic terms.
   * Falls back to the original query if Groq is unavailable.
   */
  async expandSearchQuery(query) {
    if (!this.isAvailable) return query;

    try {
      const prompt = `Expand this search query into 3–5 related terms for better semantic search.
Respond ONLY with a JSON array of strings (no markdown):
["term1", "term2", "term3"]

Query: ${query}`;

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 80,
        temperature: 0.4,
      });

      const raw = completion.choices[0]?.message?.content?.trim();
      const terms = JSON.parse(raw);
      return Array.isArray(terms) ? [query, ...terms].join(' ') : query;
    } catch (error) {
      console.warn('Query expansion skipped:', error.message);
      return query;
    }
  }
}

module.exports = new GroqService();
