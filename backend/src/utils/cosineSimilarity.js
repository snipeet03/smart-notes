/**
 * Computes cosine similarity between two numeric vectors.
 * Used to rank notes by semantic relevance to a search query.
 *
 * Score range: -1 (opposite) to 1 (identical)
 * We treat anything >= 0.3 as a relevant match.
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA?.length || !vecB?.length || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
};

/**
 * Computes keyword overlap score between query and note keywords.
 * Returns a normalized score between 0 and 1.
 */
const keywordMatchScore = (queryTerms, noteKeywords) => {
  if (!queryTerms?.length || !noteKeywords?.length) return 0;

  const querySet = new Set(queryTerms.map((t) => t.toLowerCase()));
  const noteSet = new Set(noteKeywords.map((k) => k.toLowerCase()));

  let matches = 0;
  for (const term of querySet) {
    if (noteSet.has(term)) matches++;
  }

  return matches / Math.max(querySet.size, 1);
};

/**
 * Computes final ranking score.
 * Weights: 80% embedding similarity + 20% keyword match.
 */
const computeRankingScore = (embeddingSimilarity, kwScore) => {
  return 0.8 * embeddingSimilarity + 0.2 * kwScore;
};

module.exports = { cosineSimilarity, keywordMatchScore, computeRankingScore };
