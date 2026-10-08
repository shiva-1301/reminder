# MedRem: Medication Reminder

MedRem is a full-stack healthcare companion that helps people keep track of their medicines. It covers dose reminders, prescriptions, drug information, nearby pharmacies and safety alerts, all in one dashboard with light and dark themes.

**Live demo:** _coming soon_ (see [Deployment](#deployment))

![Screenshot placeholder](docs/screenshot.png)
<!-- Add a screenshot at docs/screenshot.png -->

## Features

- **Accounts:** sign up and sign in with hashed (BCrypt) passwords and a "keep me signed in" option
- **Dashboard:** today's doses, adherence overview and quick links
- **Reminders:** add, pause/resume and delete medicine reminders
- **Prescriptions:** upload and manage prescription files
- **Drug details:** search medicines for dosage, side effects and interactions
- **Drug scanner:** a scanning UI for identifying medicines
- **Pharmacies:** find nearby pharmacies
- **Safety alerts:** filter alerts by severity and dismiss them
- Responsive layout, a collapsible sidebar, dark mode and keyboard-accessible navigation

## Tech stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite 7, Tailwind CSS 3, shadcn/ui (Radix), Framer Motion, React Hook Form + Zod |
| Backend  | Spring Boot 4 (Java 17+), Spring Security, Spring Data JPA |
| Database | PostgreSQL (e.g. Neon) |
| Hosting  | Vercel or Netlify (frontend), Render via Docker (backend) |

## Project structure

```
reminder/
├── frontend/              # React + Vite app
│   ├── public/            # static assets (favicon, images, Netlify _redirects)
│   └── src/
│       ├── components/    # auth/, layout/ (navbar, sidebar), ui/ (shadcn primitives)
│       ├── lib/           # api.ts (fetch wrapper), auth.ts (session helpers)
│       └── pages/         # one file per route
├── backend/               # Spring Boot API (controller → service → repository)
├── docs/                  # API, architecture and database notes
└── render.yaml            # Render blueprint for the backend
```

## Getting started

### Prerequisites
- Node.js 20+
- Java 17+ (Maven wrapper included)
- A PostgreSQL database (a free [Neon](https://neon.tech) database works)

### Backend
```bash
cd backend
cp .env.example .env        # then fill in DB_URL, DB_USERNAME, DB_PASSWORD
./mvnw spring-boot:run      # http://localhost:8080
```

### Frontend
```bash
cd frontend
cp .env.example .env.local  # VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev                 # http://localhost:5173
```

### Environment variables

| Where    | Variable | Purpose |
|----------|----------|---------|
| backend  | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | PostgreSQL connection |
| backend  | `ALLOWED_ORIGINS` | Comma-separated frontend URLs allowed by CORS, e.g. `https://medrem.vercel.app` |
| backend  | `PORT` / `SERVER_PORT` | HTTP port (Render sets `PORT` automatically) |
| backend  | `SHOW_SQL` | `true` to log SQL statements |
| frontend | `VITE_API_BASE_URL` | Backend base URL |

Never commit a real `.env` file. Only the `.env.example` templates belong in git.

## Deployment

### 1. Backend on Render (free)
1. Push this repo to GitHub.
2. In Render, choose **New → Blueprint** and select the repo. Render reads `render.yaml` and builds `backend/Dockerfile`.
3. When prompted, set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` and `ALLOWED_ORIGINS` (your frontend URL).
4. Wait for the first deploy, then open `https://<service>.onrender.com/api/drugs` to check it works.

### 2. Frontend on Vercel (free)
1. In Vercel, choose **Add New → Project**, import the repo and set **Root Directory** to `frontend`.
2. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
3. Add the env var `VITE_API_BASE_URL=https://<service>.onrender.com`.
4. Deploy. `vercel.json` already rewrites all routes to `index.html`, so refreshing `/dashboard` works.
5. Copy the Vercel URL back into Render's `ALLOWED_ORIGINS`.

Netlify also works: use base directory `frontend`, build `npm run build` and publish `frontend/dist`. `public/_redirects` handles routing.

> Render's free tier sleeps after inactivity, so the first request can take about 30–50 seconds.

## Known limitations

- **The API has no token-based auth yet.** Login is checked on the server, but the other endpoints are open and the frontend tracks the session in browser storage. Adding JWT (or Spring Session) is the next step before storing real patient data.
- Most pages (dashboard, reminders, prescriptions, drug details, pharmacies, alerts) still use in-memory sample data on the frontend, so changes reset on refresh, even though the backend CRUD endpoints exist. Wiring them up is a good next task.
- The drug scanner is a UI demo; it doesn't do real image recognition.

## Docs
- [API reference](docs/api.md)
- [Architecture](docs/architecture.md)
- [Database schema](docs/database.md)

## Disclaimer
MedRem is a student project and doesn't replace professional medical advice.
