// Create a new board/canvas
const boardService = require("../services/boardService");

const createCanvas = async (req, res) => {
  try {
    const { title, elements } = req.body;
    const ownerId = req.user._id; 

    const board = await boardService.createBoard({
      title,
      owner: ownerId,
      elements: elements || [],
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: "Failed to create board", details: err.message });
  }
};

// Update an existing board/canvas
const updateCanvas = async (req, res) => {
  // ...implementation...
};

// Load a specific board/canvas by ID
const loadCanvas = async (req, res) => {
  // ...implementation...
};

// Share a board/canvas with another user
const shareCanvas = async (req, res) => {
  // ...implementation...
};

// Unshare a board/canvas from a user
const unshareCanvas = async (req, res) => {
  // ...implementation...
};

// Delete a board/canvas
const deleteCanvas = async (req, res) => {
  // ...implementation...
};

// Get all boards/canvases for the authenticated user
const getUserCanvases = async (req, res) => {
  // ...implementation...
};

// Real-time collaboration: join a board/canvas
const joinCanvas = async (req, res) => {
  // ...implementation...
};

// Real-time collaboration: leave a board/canvas
const leaveCanvas = async (req, res) => {
  // ...implementation...
};

// Get active users on a board/canvas
const getActiveUsers = async (req, res) => {
  // ...implementation...
};

module.exports = {
  createCanvas,
  updateCanvas,
  loadCanvas,
  shareCanvas,
  unshareCanvas,
  deleteCanvas,
  getUserCanvases,
  joinCanvas,
  leaveCanvas,
  getActiveUsers,
};
