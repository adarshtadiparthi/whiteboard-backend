Perfect 👍 thanks for pointing me back to the screenshot. I’ll carefully reconstruct your **codebase structure** from the photo and generate a README tailored to it.

---

# Collaborative Whiteboard Backend

## Overview

This is the backend service for a collaborative whiteboard application.
It handles user authentication, board management, and real-time collaboration through Socket.IO, while persisting data in MongoDB.

---

## File Structure

```
whiteboard-backend/
│── config/
│   └── db.js               # MongoDB connection
│
│── controllers/
│   ├── boardController.js  # Board-related logic (create, update, share, etc.)
│   └── userController.js   # User signup, signin, getMe
│
│── middleware/
│   └── authMiddleware.js   # JWT authentication middleware
│
│── persistence/
│   └── models/
│       ├── Board.js        # Board schema
│       └── User.js         # User schema
│   └── boardRepository.js  # Board DB operations
│   └── userRepository.js   # User DB operations
│
│── routes/
│   ├── boardRoutes.js      # Routes for board operations
│   └── userRoutes.js       # Routes for user authentication
│
│── services/
│   ├── boardService.js     # Board service layer
│   └── userService.js      # User service layer
│
│── .env                    # Environment variables
│── .gitignore
│── index.js                # Main server entrypoint (Express + Socket.IO)
│── package.json
│── package-lock.json
```

---

## Features

1. **Authentication**

   * JWT-based signup and signin
   * Protected routes with middleware
   * `/api/user/me` to fetch logged-in user

2. **Board Management**

   * Create, update, load, share, unshare, delete boards
   * API endpoints under `/api/board`

3. **Real-time Collaboration**

   * Board join/leave presence
   * Cursor sharing
   * Drawing protocol (start, update, commit, erase)
   * Stored elements are persisted to MongoDB

---

## Setup Instructions

1. Clone the repo

   ```
   git clone https://github.com/adarshtadiparthi/whiteboard-backend.git
   cd whiteboard-backend
   ```
2. Install dependencies

   ```
   npm install
   ```
3. Create a `.env` file

   ```
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-secret>
   PORT=5000
   ```
4. Run the server

   ```
   npm run dev
   ```

   or

   ```
   node index.js
   ```

---

## API Endpoints

### User

* `POST /api/user/signup` → Create account
* `POST /api/user/signin` → Login
* `GET /api/user/me` → Get current user (protected)

### Board

* `POST /api/board/create` → Create board
* `PUT /api/board/update/:id` → Update board
* `GET /api/board/load/:id` → Load board
* `PUT /api/board/share/:id` → Share board
* `PUT /api/board/unshare/:id` → Unshare board
* `DELETE /api/board/delete/:id` → Delete board

---

## WebSocket Events

* `board:join` / `board:leave`
* `presence:join` / `presence:leave`
* `cursor`
* `element:start`
* `element:points`
* `element:update`
* `element:commit`
* `element:erase`

---

## Tech Stack

* **Express.js** – Backend framework
* **MongoDB + Mongoose** – Data persistence
* **Socket.IO** – Real-time communication
* **JWT** – Authentication
* **CORS** – Cross-origin support

---