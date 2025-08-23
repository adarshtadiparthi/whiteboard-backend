const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const Board = require("./persistence/models/Board");

// Express app setup
const app = express();
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");

app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Socket.IO realtime functionality
io.on("connection", async (socket) => {
  // Optional auth
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (e) {
    // console.log("Invalid token for socket auth");
  }

  // Join a board room
  socket.on("board:join", async ({ boardId }) => {
    if (!boardId) return;
    socket.join(`board:${boardId}`);
    socket.to(`board:${boardId}`).emit("presence:join", {
      userId: socket.user?._id,
      socketId: socket.id,
    });
  });

  // Cursor presence (ephemeral)
  socket.on("cursor", ({ boardId, x, y, color, name }) => {
    socket.to(`board:${boardId}`).emit("cursor", {
      socketId: socket.id, x, y, color, name,
    });
  });

  // === DRAWING PROTOCOL ===
  socket.on("element:start", ({ boardId, tempId, element }) => {
    socket.to(`board:${boardId}`).emit("element:start", { tempId, element });
  });

  socket.on("element:points", ({ boardId, tempId, pointsChunk }) => {
    socket.to(`board:${boardId}`).emit("element:points", { tempId, pointsChunk });
  });

  socket.on("element:update", ({ boardId, tempId, patch }) => {
    socket.to(`board:${boardId}`).emit("element:update", { tempId, patch });
  });

  socket.on("element:commit", async ({ boardId, tempId, element }) => {
    try {
      const saved = await Board.findByIdAndUpdate(
        boardId,
        { $push: { elements: element } },
        { new: true, projection: { elements: { $slice: -1 } } }
      );
      const final = saved?.elements?.[0]; // $slice: -1 returns an array with one element
      if (!final) throw new Error("Element not saved correctly.");

      const finalId = final.id;

      io.to(`board:${boardId}`).emit("element:commit", {
        tempId,
        finalId,
        element: final.toObject(), // Use .toObject() for a clean JS object
      });
    } catch (error) {
      console.error("Error committing element:", error);
      socket.emit("element:commit:error", { tempId, error: error.message });
    }
  });

  socket.on("element:erase", async ({ boardId, elementIds }) => {
    if (!Array.isArray(elementIds) || elementIds.length === 0) return;
    try {
      await Board.findByIdAndUpdate(boardId, {
        $pull: { elements: { id: { $in: elementIds } } },
      });
      // Broadcast to all clients in the room including sender for confirmation
      io.to(`board:${boardId}`).emit("element:erase", { elementIds });
    } catch (error) {
      console.error("Error erasing elements:", error);
      socket.emit("element:erase:error", { error: error.message });
    }
  });

  // Leave & cleanup
  socket.on("board:leave", ({ boardId }) => {
    socket.leave(`board:${boardId}`);
    socket.to(`board:${boardId}`).emit("presence:leave", {
      userId: socket.user?._id,
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const rooms = Array.from(socket.rooms);
    rooms.forEach(room => {
      if (room !== socket.id && room.startsWith('board:')) {
        socket.to(room).emit("presence:leave", {
          userId: socket.user?._id,
          socketId: socket.id,
        });
      }
    });
  });
});

// Database connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 HTTP+WS server running on port ${PORT}`));