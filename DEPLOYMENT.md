# Deployment Guide: Smart Notes

This guide provides step-by-step instructions to deploy the Smart Notes application:
- **Backend (API)**: Deployed to [Render](https://render.com) using the Blueprint (`render.yaml`) configuration.
- **Frontend (Web)**: Deployed to [Vercel](https://vercel.com) using the root configuration (`vercel.json`).

---

## Prerequisites

1. A [GitHub](https://github.com) account. Ensure your local commits are pushed to your remote repository:
   ```bash
   git push origin main
   ```
2. A free [Render Account](https://dashboard.render.com).
3. A free [Vercel Account](https://vercel.com).
4. A [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) cluster connection string.
5. A [Groq API Key](https://console.groq.com) for AI note summaries (optional, fallbacks are supported).

---

## Step 1: Deploy Backend on Render

Render's Blueprints automatically scan the `render.yaml` configuration file to instantiate the backend service with all required scripts.

1. Log in to the [Render Dashboard](https://dashboard.render.com).
2. Click the **New** button (top right) and select **Blueprint**.
3. Link your GitHub account and select the **smart-notes** repository.
4. Name your blueprint group (e.g., `smart-notes-stack`).
5. Render will automatically detect the backend service from `render.yaml` and ask for the following environment variables:
   - **`MONGODB_URI`**: Put your MongoDB Atlas connection string here.
   - **`GROQ_API_KEY`**: Put your Groq API Key here.
   - **`CLIENT_URL`**: Leave this empty for now (it will default to allow all traffic `*`). We will lock it down to your Vercel URL later.
6. Click **Apply**.
7. Render will build and deploy the backend. Once deployment succeeds, look at the top left of the service dashboard for your backend URL (e.g., `https://smart-notes-backend.onrender.com`).
8. Copy this URL (we will need it for Vercel).

---

## Step 2: Deploy Frontend on Vercel

Vercel is optimized for static React/Vite builds. Our root `vercel.json` will direct Vercel to install packages, build the frontend, and handle client-side routing.

1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import the **smart-notes** GitHub repository.
4. Keep the **Root Directory** as `.` (root directory of the project). Vercel will automatically read the instructions from the root `vercel.json`.
5. Under **Environment Variables**, add the following variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://<YOUR-RENDER-BACKEND-URL>/api` (e.g., `https://smart-notes-backend.onrender.com/api`)
     > [!IMPORTANT]
     > Make sure to append `/api` to the end of your Render backend URL.
6. Click **Deploy**.
7. Vercel will build and host your frontend, then provide a live deployment URL (e.g., `https://smart-notes.vercel.app`).

---

## Step 3: Secure the Backend (Recommended)

To protect your backend API from unauthorized origins, configure CORS to only allow requests from your frontend:

1. Copy your Vercel deployment URL (e.g., `https://smart-notes.vercel.app`).
2. Go to your **Render Dashboard** and select your backend Web Service.
3. Navigate to **Environment** in the left sidebar.
4. Set the **`CLIENT_URL`** environment variable to your Vercel URL.
5. Save the changes. Render will automatically redeploy the backend with the new configuration.

---

## Troubleshooting

### High Latency on First Search/Request
- **Render Free Tier Spin Up**: Render's free tier spins down web services after 15 minutes of inactivity. The first request after some time might take 50-60 seconds to respond as the instance wakes up.
- **Model Downloads**: The backend loads `@xenova/transformers` locally. The first search/embedding request triggers a 25MB model download. The client-side Axios instance has a timeout of `30000` (30 seconds) to accommodate this. Subsequent requests will be extremely fast.
