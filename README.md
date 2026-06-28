# 🚀 Smart Notes

> A modern full-stack Notes & Task Management application built with **React**, **Node.js**, **Express**, and **MongoDB**, featuring CRUD operations, filtering, pagination, and **AI-powered semantic search** using embeddings with optional **Groq (Llama 3.3 70B)** enhancements.

---

## 📌 Project Overview

Smart Notes is a full-stack web application developed as part of a **Full Stack Developer Take-Home Assessment**. The application enables users to create, organize, update, delete, and search notes efficiently.

Unlike traditional keyword-based search, Smart Notes implements **lightweight semantic search** using embeddings and cosine similarity, allowing users to retrieve notes based on meaning rather than exact text matches.

---

## ✨ Features

### Backend

- RESTful CRUD API
- MongoDB with Mongoose
- Input validation using Express Validator
- Pagination
- Status filtering
- Tag filtering
- Global error handling
- Secure middleware (Helmet, CORS, Compression)
- Consistent API response format

### Frontend

- Responsive React UI
- Tailwind CSS
- Create, Edit & Delete Notes
- Search Notes
- Filter by Status
- Pagination
- Loading States
- Empty States
- Error Handling
- Toast Notifications

### AI Features

- Semantic Search using Embeddings
- Cosine Similarity Ranking
- Optional Groq (Llama 3.3 70B) Integration
- Query Enhancement
- Keyword Generation
- Note Summarization

---

# 🛠 Tech Stack

## Frontend

- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI / Semantic Search

- Groq API
- Llama 3.3 70B
- Embeddings
- Cosine Similarity

---

# 📂 Project Structure

```
smart-notes/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── embeddings/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | `/notes` | Create a note |
| GET | `/notes` | Get all notes |
| GET | `/notes/:id` | Get a single note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |
| GET | `/notes/search?q=` | Semantic search |

---

# 📦 Note Schema

```javascript
{
  title: String,
  content: String,
  tags: [String],
  status: "todo" | "in-progress" | "done",
  embedding: [Number],
  createdAt: Date,
  updatedAt: Date
}
```

---

# 🔍 Semantic Search

Traditional search only matches exact keywords.

Example

```
Search:

backend

↓

Matches only notes containing "backend"
```

Smart Notes uses semantic search.

Workflow

```
User Query
      │
      ▼
Generate Query Embedding
      │
      ▼
Cosine Similarity
      │
      ▼
Rank Notes
      │
      ▼
Return Most Relevant Results
```

This allows searches like:

```
Query

server development

↓

Returns

Node.js
Express
Backend APIs
```

even if those exact words are not present.

---

# 🤖 AI Integration

The project optionally integrates **Groq (Llama 3.3 70B)** for:

- Query Expansion
- Keyword Extraction
- Note Summarization

The application gracefully falls back to embedding-based semantic search if the LLM is unavailable.

---

# ⚖️ Trade-offs

### Chosen Approach

Embedding-based Semantic Search

### Advantages

- Better search relevance
- Understands semantic meaning
- Retrieves related concepts
- Improved user experience

### Trade-offs

- Slightly higher storage due to embedding vectors
- Additional processing during note creation/update
- More computationally intensive than keyword search

This approach provides a strong balance between search quality and implementation complexity for a lightweight application.

---

# 📥 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/smart-notes.git

cd smart-notes
```

---

# ⚙️ Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key
```

Run

```bash
npm run dev
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

| Variable | Description |
|------------|-------------|
| PORT | Backend Port |
| MONGODB_URI | MongoDB Connection String |
| GROQ_API_KEY | Groq API Key |

---

# 📄 Sample API Response

### Success

```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# 🏗 Architecture Decisions

- Clean and modular project structure
- Thin controllers with service layer separation
- RESTful API design
- Reusable React components
- Centralized error handling
- Express Validator for request validation
- Debounced frontend search
- Semantic search using embeddings
- AI-assisted search enhancements

---

# 🚀 Future Improvements

- User Authentication
- JWT Authorization
- Rich Text Notes
- File Uploads
- Real-time Collaboration
- Docker Support
- Unit Testing
- Integration Testing
- Search Highlighting
- Vector Database Integration
- CI/CD Pipeline

---

# ✅ Assessment Requirements Covered

- REST API
- CRUD Operations
- Pagination
- Filtering
- Validation
- MongoDB Schema Design
- React Frontend
- Tailwind CSS
- Search Functionality
- Semantic Search (Bonus)
- Loading States
- Error Handling
- Responsive UI
- README Documentation

---

# 🤝 AI Assistance

This project was developed with the assistance of AI coding tools for architecture guidance, code generation, debugging, and documentation. All generated code was reviewed, tested, and adapted to meet the assessment requirements.

---

# 📄 License

This project was created as part of a Full Stack Developer Take-Home Assessment and is intended for evaluation purposes.