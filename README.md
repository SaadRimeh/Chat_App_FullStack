Gamza — Chat App (Full Stack)

A simple full-stack chat application (React + Express + MongoDB). This README explains how to set up, run, and build the project locally and gives a short overview of the repository structure and required environment variables.

## Requirements

- Node.js >= 20.0.0
- npm (comes with Node)
- MongoDB (Atlas connection string or local instance)

## Repository layout

- `backend/` — Express API, authentication, Mongoose models
  - `src/server.js` — app entry (connects to MongoDB and starts the server)
  - `src/lib/db.js` — MongoDB connection helper
  - `src/lib/utils.js` — helper (JWT token generator)
  - `src/controllers/` — controller logic (signup/login)
  - `src/routes/` — API routes
- `frontend/` — React app bootstrapped with Vite

## Environment variables

Create a `.env` file in `backend/` (or set env vars in your environment). Required variables:

- `MONGO_URL` — MongoDB connection string (e.g. from Atlas). The backend will exit if this is missing.
- `JWT_SECRET` — Secret used to sign JWT cookies. The backend will throw if this is missing.
- `PORT` — (optional) port for the backend server (defaults to `3000`).
- `NODE_ENV` — `development` or `production`. When `production`, the backend will serve the built frontend from `frontend/dist`.

Example `backend/.env`:

```
MONGO_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_value
PORT=3000
NODE_ENV=development
```

## Local development

All commands below are PowerShell-friendly. Run them from the repository root (`c:\Users\saad\Desktop\Gamza`).

1) Install dependencies for both packages (root helper script):

```powershell
npm run build
```

Note: The root `build` script installs both backend and frontend dependencies and then builds the frontend. If you only want to install each side separately:

```powershell
npm install --prefix backend
npm install --prefix frontend
```

2) Start the backend (development, uses nodemon):

```powershell
# from repo root
npm run start --prefix backend
```

3) Start the frontend dev server (Vite):

```powershell
# in a separate terminal
npm run dev --prefix frontend
```

The frontend dev server will run on Vite's default (usually http://localhost:5173). The backend API runs on the `PORT` you set (default 3000) and exposes routes under `/api` (for example: `http://localhost:3000/api/auth`).

## Build for production

1) Build the frontend:

```powershell
npm run build --prefix frontend
```

2) Install backend deps (if not already installed):

```powershell
npm install --prefix backend
```

3) Set `NODE_ENV=production` and start the backend. When `NODE_ENV` is `production` the backend serves the built frontend from `frontend/dist`.

```powershell
# set env var in PowerShell and start the backend (example)
$env:NODE_ENV = 'production'; npm run start --prefix backend
```

Or use a process manager (pm2, systemd, etc.) in production.

## API endpoints (high level)

- POST /api/auth/signup — create an account (expects JSON: fullName, email, password)
- POST /api/auth/login — login (sets an HTTP-only cookie `jwt`)
- GET/POST /api/messages — message operations (see `backend/src/routes`)

Refer to the route files in `backend/src/routes/` for full details.

## Notes & troubleshooting

- The backend will exit if `MONGO_URL` is not provided. Check `backend/src/lib/db.js`.
- Token generation requires `JWT_SECRET`; the app throws when it's missing (see `backend/src/lib/utils.js`).
- If the frontend can't reach the API during local dev, either configure a proxy in Vite or call the backend using the full URL (http://localhost:3000/api/...).

## Development tips

- Use two terminals: one for `frontend` dev server and one for backend nodemon.
- Use MongoDB Atlas for an easy cloud DB during development.


