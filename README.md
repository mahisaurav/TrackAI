# TrackAI

TrackAI is a full-stack placement preparation platform that helps students track job applications, manage resumes, analyze ATS compatibility, practice mock interviews, and structure DSA preparation with daily tasks.

Built for placement season — practical, focused, and interview-ready.

---

## Features

- **Authentication** — Register, login, logout with JWT (httpOnly cookies)
- **Application Tracker** — Create, update, delete, and track application status
- **Resume Manager** — Upload PDF resumes to AWS S3, preview, delete
- **ATS Analysis** — Gemini-powered resume analysis with persisted reports
- **Mock Interviews** — AI-generated technical, project, core CS, and HR questions
- **DSA Sheet** — 125+ curated problems with progress, notes, revisions, and streaks
- **Daily Tasks** — Pending, completed, and missed task workflow with streak integration
- **Dashboard** — Overview of placement activity

---

## Architecture

```
┌─────────────────┐     HTTPS/API      ┌─────────────────┐
│  React (Vite)   │ ◄────────────────► │ Express (Node)  │
│  Tailwind CSS   │   JWT cookies      │  Prisma ORM     │
└─────────────────┘                    └────────┬────────┘
                                                │
                    ┌───────────────────────────┼───────────────────────────┐
                    │                           │                           │
              ┌─────▼─────┐              ┌──────▼──────┐            ┌──────▼──────┐
              │ PostgreSQL│              │   AWS S3    │            │  Gemini API │
              │  (Neon)   │              │  (Resumes)  │            │ ATS/Mock    │
              └───────────┘              └─────────────┘            └─────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL, Prisma |
| Storage | AWS S3 |
| AI | Google Gemini |
| Auth | JWT + httpOnly cookies |

---

## Folder Structure

```
Placement Tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios API clients
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── utils/          # Helpers (DSA, tasks, etc.)
│   │   └── data/           # Static DSA question bank
│   └── dist/               # Production build output
├── server/                 # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/             # Schema + migrations
│   ├── services/           # Gemini, etc.
│   └── utils/
└── README.md
```

---

## Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- AWS S3 bucket (for resumes)
- Google Gemini API key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Placement Tracker"
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma migrate deploy
npx prisma generate
npm run dev
```

### 3. Frontend setup

```bash
cd client
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000
npm run dev
```

Open `http://localhost:5173`

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS (e.g. `https://your-app.vercel.app`) |
| `PORT` | Server port (default `5000`) |
| `AWS_REGION` | S3 region |
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_BUCKET_NAME` | S3 bucket name |
| `GEMINI_API_KEY` | Google Gemini API key |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (e.g. `https://your-api.onrender.com`) |

---

## Running Locally

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

---

## Deployment

### Recommended stack (free tier)

| Service | Provider | Purpose |
|---------|----------|---------|
| Database | [Neon](https://neon.tech) | PostgreSQL |
| Backend | [Render](https://render.com) | Express API |
| Frontend | [Vercel](https://vercel.com) | React static site |
| Storage | AWS S3 | Resume files |
| AI | Google AI Studio | Gemini API |

### Database (Neon)

1. Create account at https://neon.tech
2. Create a new project and database
3. Copy the connection string → `DATABASE_URL` in server env
4. Use `?sslmode=require` if required by provider

### Backend (Render)

1. Create account at https://render.com
2. New **Web Service** → connect GitHub repo
3. **Root directory:** `server`
4. **Build command:** `npm install && npx prisma migrate deploy && npx prisma generate`
5. **Start command:** `npm start`
6. Add all server environment variables
7. Set `NODE_ENV=production` and `CLIENT_URL` to your Vercel URL

### Frontend (Vercel)

1. Create account at https://vercel.com
2. Import GitHub repo
3. **Root directory:** `client`
4. **Build command:** `npm run build`
5. **Output directory:** `dist`
6. Environment variable: `VITE_API_URL=https://your-render-service.onrender.com`

### Production auth notes

- Backend sets cookies with `secure: true` and `sameSite: none` in production
- `CLIENT_URL` must exactly match your frontend origin (no trailing slash)
- Frontend must use `withCredentials: true` (already configured)

### AWS S3

- Create a bucket with block public access enabled
- IAM user with `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject` on the bucket
- Set the four AWS env vars on the server

### Gemini

- Get API key from https://aistudio.google.com/apikey
- Set `GEMINI_API_KEY` on the server

---

## API Overview

| Route | Description |
|-------|-------------|
| `/auth/*` | Register, login, logout, me |
| `/applications` | Application CRUD |
| `/api/resume/*` | Resume upload, preview, ATS, delete |
| `/api/mock/*` | Mock interview generation |
| `/api/dsa/*` | DSA progress and stats |
| `/api/daily-tasks` | Daily task CRUD |
| `/api/tasks/:id` | Task PATCH (complete) |

---

## Future Improvements

- Request queue for Gemini-heavy endpoints (ATS, mock interviews)
- Email notifications for application deadlines
- Rate limiting on auth and AI routes
- Optional auto-cleanup of old completed tasks
- Mobile-responsive sidebar navigation

---

## License

Private / educational use. Built as a placement preparation project.
