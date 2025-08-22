const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");

app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
