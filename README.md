# Smart Notes

A production-quality full-stack Notes and Task Management application with **semantic search powered by local embeddings**.

---

## Project Overview

Smart Notes lets users create, edit, delete, filter, and search notes intelligently. Instead of relying on basic substring matching, it uses **vector embeddings** to understand the *meaning* of a search query and rank notes by semantic relevance — even when the exact words don't match.

**Example:** Searching *"things I need to buy"* will surface a note titled *"grocery list"* — because the embeddings understand they're semantically similar.

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Frontend (React)                  │
│  Pages: Home · CreateNote · EditNote                  │
│  Hooks: useNotes · useSearch (debounced, cancelable)  │
└───────────────────────┬──────────────────────────────┘
                        │ REST API (Axios)
┌───────────────────────▼──────────────────────────────┐
│                  Backend (Express.js)                  │
│  Routes → Controllers → Services → Mongoose Models    │
│                                                        │
│  ┌──────────────┐   ┌──────────────┐                  │
│  │ EmbeddingService│  │  GroqService │                 │
│  │ (local ONNX)  │  │ (Llama 3.3)  │                 │
│  └──────┬───────┘   └──────┬───────┘                  │
│         │                  │                           │
│  ┌──────▼──────────────────▼───────┐                  │
│  │           MongoDB (Mongoose)     │                  │
│  │  Notes: title, content, tags,    │                  │
│  │         status, embedding[]      │                  │
│  └──────────────────────────────────┘                 │
└──────────────────────────────────────────────────────┘
```

### Semantic Search Pipeline

```
User types query
      ↓
[Optional] Groq expands query → "buy milk" → "buy milk groceries shopping store"
      ↓
Generate 384-dim embedding for (expanded) query
      ↓
Fetch all notes with their stored embeddings from MongoDB
      ↓
For each note, compute:
  - Cosine similarity(query_embedding, note_embedding) × 0.8
  - Keyword overlap score × 0.2
  = Final ranking score
      ↓
Filter: score > 0.25 threshold
Sort: highest score first
Return: top N results with relevanceScore
```

---

## Folder Structure

```
smart-notes/
├── backend/
│   ├── src/
│   │   ├── config/         # MongoDB connection
│   │   ├── controllers/    # Thin HTTP handlers
│   │   ├── middleware/     # Error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Business logic (noteService, groqService)
│   │   ├── embeddings/     # Local embedding model wrapper
│   │   ├── validators/     # express-validator rules
│   │   ├── utils/          # cosineSimilarity, responseHelper
│   │   ├── app.js          # Express setup
│   │   └── server.js       # Entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/     # Navbar
    │   │   ├── notes/      # NoteCard, NoteForm, SearchBar, Filters, Pagination, DeleteModal
    │   │   └── ui/         # Spinner, StatusBadge, TagChip, EmptyState, ErrorState
    │   ├── hooks/          # useNotes, useSearch
    │   ├── pages/          # Home, CreateNote, EditNote
    │   ├── services/       # Axios API client
    │   ├── styles/         # Tailwind CSS
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── vite.config.js
    └── package.json
```

---

## Installation

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- A free [Groq API key](https://console.groq.com) (optional — search works without it)

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `GROQ_API_KEY` | ❌ | Groq API key for AI enrichment (optional) |
| `PORT` | ❌ | Server port (default: 5000) |
| `NODE_ENV` | ❌ | `development` or `production` |

---

## Running MongoDB

**Local:**
```bash
mongod --dbpath ./data/db
```

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongo mongo:7
```

**Atlas:** Use your Atlas connection string in `MONGODB_URI`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/notes` | Create note (generates embedding + AI enrichment) |
| `GET` | `/api/notes?page=1&limit=10&status=todo&tags=work` | List notes with filters |
| `GET` | `/api/notes/:id` | Get single note |
| `PUT` | `/api/notes/:id` | Update note (regenerates embedding if content changed) |
| `DELETE` | `/api/notes/:id` | Delete note |
| `GET` | `/api/notes/search?q=query` | Semantic search |

### Response format

```json
{
  "success": true,
  "message": "Note created successfully",
  "data": { ... }
}
```

---

## Semantic Search Explanation

### Why cosine similarity?

Cosine similarity measures the *angle* between two vectors in high-dimensional space — not their magnitude. This makes it ideal for comparing semantic embeddings: two texts that mean the same thing will have embeddings pointing in the same direction, regardless of length.

### Why `all-MiniLM-L6-v2`?

- Free, runs locally via `@xenova/transformers` (ONNX runtime in Node.js)
- 384 dimensions — small enough to store in MongoDB without issues
- Excellent quality-to-speed ratio for English text
- No API key, no rate limits, no cost

### Ranking formula

```
score = (0.8 × cosine_similarity) + (0.2 × keyword_overlap)
```

The keyword component adds a small boost when query terms literally appear in note keywords, tags, or title — compensating for cases where pure vector similarity might rank slightly lower due to domain-specific vocabulary.

### Threshold

Notes with `score < 0.25` are filtered out to avoid low-quality results. This value was chosen empirically; it can be tuned.

---

## Groq / AI Features

When Groq is configured:

1. **Note enrichment** — On create/update, Llama 3.3 70B generates:
   - A one-sentence `summary` stored on the note
   - 5 `keywords` used to boost search ranking

2. **Query expansion** — Before semantic search, the query is expanded:
   - `"buy milk"` → `"buy milk groceries shopping store dairy"`
   - This improves recall for short or ambiguous queries

**Graceful degradation:** If Groq is unavailable, notes are saved without summaries and search uses the raw query. Nothing breaks.

---

## Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| Store embeddings in MongoDB | Avoids Pinecone/Weaviate cost; linear scan is fine for <50k notes |
| `@xenova/transformers` (ONNX) | ~25MB model download on first run; no GPU needed |
| Groq optional | Removes a hard dependency; degrades gracefully |
| `embedding: { select: false }` | Keeps list/detail responses lean; fetched only for search |
| Frontend proxy via Vite | Simplifies local dev; production needs nginx/reverse proxy |

---

## Future Improvements

- [ ] Vector index using MongoDB Atlas Vector Search (for scale)
- [ ] Note tagging suggestions from AI
- [ ] Full-text + semantic hybrid search (BM25 + cosine)
- [ ] User authentication (JWT)
- [ ] Note sharing / collaboration
- [ ] Export to Markdown / PDF
- [ ] Browser extension to clip web content as notes
