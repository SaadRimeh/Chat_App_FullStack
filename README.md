# **Gamza — Full-Stack Chat Application**

Gamza is a modern real-time chat application built with **React**, **Express**, **MongoDB**, and **Socket.IO**.
It features secure authentication, real-time messaging, and a clean architecture optimized for both development and production.

---

## 🚀 **Tech Stack**

### **Frontend**

* React + Vite
* Component-based structure
* Located in `frontend/`

### **Backend**

* Express.js
* Mongoose (MongoDB ODM)
* Socket.IO for real-time messaging
* Located in `backend/`

### **Real-Time Communication**

* Socket.IO server with JWT authentication
* Uses an HTTP-only cookie (`jwt`)
* Browser automatically includes the cookie during the WebSocket handshake

---

## 📦 **Project Structure**

```
/backend   → Express API, authentication, Socket.IO server, Mongoose models
/frontend  → React app (Vite)
```

---

## 🔧 **Requirements**

* Node.js v20+
* npm
* MongoDB (Atlas or local)

---

## 🔐 **Environment Variables**

Create a `.env` file inside `backend/`:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🍪 **Cookie Configuration**

Gamza uses a secure HTTP-only cookie for authentication.

### **Development**

* `sameSite: "lax"`
* `secure: false`
* Works with the Vite dev server

### **Production**

* `sameSite: "none"`
* `secure: true`
* Required for cross-site cookies over HTTPS

---

## 🛠️ **Local Development Guide (PowerShell)**

### **1. Install dependencies**

```powershell
npm install --prefix backend
npm install --prefix frontend
```

### **2. Create backend/.env**

(Use the example above)

### **3. Start both servers**

#### **Backend**

```powershell
$env:NODE_ENV='development';
$env:CLIENT_URL='http://localhost:5173';
npm run start --prefix backend
```

#### **Frontend**

```powershell
npm run dev --prefix frontend
```

---

## 📡 **API Endpoints**

### **Auth — `/api/auth/v1/*`**

* Signup
* Login
* Logout
* Update profile

### **Messages — `/api/messages/v1/*`**

* Get contacts
* Get chats
* Get messages
* Send a message

---

## ⚡ **How Real-Time Messaging Works**

### **Socket Server**

* Implemented in `backend/src/lib/socket.js`
* Uses `socketAuthMiddleware` to validate JWT cookies during connection

### **Client Socket Setup**

```js
io(BASE_URL, { withCredentials: true });
```

### **Socket Events**

* `getOnlineUsers` — broadcast list of online users
* `newMessage` — real-time delivery of messages

### **Message Flow**

1. Client sends message via REST:
   `POST /api/messages/v1/send/:id`
2. Backend saves it to MongoDB
3. If the receiver is online → server emits `newMessage`

---

## 🧪 **Troubleshooting: Auth & Real-Time**

### **1. Check WebSocket Handshake**

DevTools → Network → `/socket.io/`

* Ensure the **cookie header includes `jwt`**

### **2. Check Backend Logs**

Look for socket auth errors (invalid token, missing cookie, etc.).

### **3. Validate Cookie Settings**

* Dev: `sameSite="lax"`, `secure=false`
* Prod: `sameSite="none"`, `secure=true`

### **4. Check JWT Secret**

Ensure `JWT_SECRET` matches the token signer.

---

## ✔️ **Quick Debug Checklist**

* `jwt` cookie exists (DevTools → Application → Cookies)
* `/socket.io/` request includes cookie
* No socket auth errors in backend logs
* `CLIENT_URL` correct in `.env`

---

## 🔧 **Optional Improvements**

I can help you add:

* `backend/.env.example`
* Root `dev` script to run frontend + backend together
* Automatic cookie setup based on `NODE_ENV`
* More logging for socket connections


---

