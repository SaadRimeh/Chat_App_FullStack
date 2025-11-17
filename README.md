Gamza — Chat App (Full Stack)

A simple full-stack chat application (React + Express + MongoDB) with real-time messaging via Socket.IO.

Overview
- Frontend: React + Vite (in `/frontend`)
- Backend: Express + Mongoose + Socket.IO (in `/backend`)
- Realtime: Socket.IO authenticates using an HTTP-only `jwt` cookie set by the backend

Requirements
- Node.js >= 20.0.0
- npm
- MongoDB (Atlas or local)

Repository layout
- `backend/` — Express API, Socket.IO server, authentication, Mongoose models
- `frontend/` — React app (Vite)

Environment variables
Create a `.env` file in `backend/` or set these in your environment:

- `MONGO_URL` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWTs (required)
- `PORT` — backend port (default 3000)
- `NODE_ENV` — `development` or `production`
- `CLIENT_URL` — frontend origin used by CORS and Socket.IO (dev default `http://localhost:5173`)

Cookie & Socket notes
- The app uses an HTTP-only cookie named `jwt` for authentication. The Socket.IO server reads this cookie from the socket handshake and verifies it. For sockets to authenticate, the browser must send this cookie with the initial handshake.
- Recommended cookie behavior:
  - Development: `sameSite='lax'`, `secure=false` (allows the cookie to be sent from Vite dev server)
  - Production: `sameSite='none'`, `secure=true` (required for cross-site cookies over HTTPS)

Local development (PowerShell)
1) Install dependencies
```powershell
npm install --prefix backend
npm install --prefix frontend
```

2) Add `backend/.env` (example)
```
MONGO_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb
JWT_SECRET=your_secret_here
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

3) Start backend and frontend (two terminals)
```powershell
# terminal 1 — backend
$env:NODE_ENV='development'; $env:CLIENT_URL='http://localhost:5173'; npm run start --prefix backend

# terminal 2 — frontend
npm run dev --prefix frontend
```

API Overview
- Auth: `/api/auth/v1/*` — signup, login, logout, profile update
- Messages: `/api/messages/v1/*` — get contacts, get chats, get messages, send message

Real-time messaging (how it works)
- Socket server setup: `backend/src/lib/socket.js` creates an HTTP server and a Socket.IO server. It uses `socketAuthMiddleware` to verify the `jwt` token on each connection.
- Client connection: frontend connects with `io(BASE_URL, { withCredentials: true })` so the browser sends cookies with the socket handshake. Socket events used in the repo:
  - `getOnlineUsers` — server emits list of online user ids
  - `newMessage` — server emits a new message to the receiver's socket id
- Sending messages: REST endpoint `POST /api/messages/v1/send/:id` saves a message and then, if the receiver is online, the server emits `newMessage` to the receiver socket.

Troubleshooting (real-time and auth)
- If messages are not arriving in real time, check:
  - Is the socket connection established? In the browser console look for any socket errors and inspect the `Network` tab for the `/socket.io/` handshake request — confirm the `cookie` header includes the `jwt` cookie.
  - Server logs: `backend` prints socket auth errors (e.g. `Socket connection rejected: ...`).
  - Cookie settings: ensure `sameSite` and `secure` settings allow the cookie to be sent from your frontend origin. In development, set `CLIENT_URL` to `http://localhost:5173` and cookie `sameSite` to `lax` in the backend.
  - Confirm `JWT_SECRET` matches between server and how token was generated.

Quick checks
- Browser devtools → Application → Cookies: inspect `localhost:3000` cookies; confirm `jwt` exists after login/signup.
- Network → find `/socket.io/` request and check Request Headers → `cookie` should contain `jwt=...`.

Optional improvements I can make
- Add `backend/.env.example` to the repo
- Add a root `dev` script to start both frontend/backend concurrently
- Add more logging around socket connects/disconnects and message emits

If you want, I can also update the backend cookie settings (`backend/src/lib/utils.js`) so it sets `sameSite` and `secure` based on `NODE_ENV` (recommended). Want me to make that change now?
