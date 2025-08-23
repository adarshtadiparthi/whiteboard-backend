// Create a new board/canvas
const boardService = require("../services/boardService");
const userService = require("../services/userService");

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

// Load a specific board/canvas by ID
const loadCanvas = async (req, res) => {
    try{
        const canvasId = req.params.id;
        const userId = req.user._id;
        // console.log(canvasId, userId);

        const board = await boardService.getBoardById(canvasId, userId);
        // console.log(board);
        if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }
        res.json(board);
    } catch (err) {
        res.status(500).json({ error: "Failed to load board", details: err.message });
    }
};

// Share a board/canvas with another user
const shareCanvas = async (req, res) => {
  try {
    const canvasId = req.params.id;
    const userId = req.user._id;
    const { email } = req.body; 
    if(!email){
        return res.status(400).json({ error: "Email is required" });
    }

    const sharedUserId = await userService.getUserIdByEmail(email);
    if(!sharedUserId){
        return res.status(404).json({ error: "User not found with the provided email" });
        // TODO: Handle case where user is not found
    }

    const sharedWith = { userId: sharedUserId, email };

    const board = await boardService.shareBoard(canvasId, userId, sharedWith);
    if (!board) {
      return res.status(404).json({ error: "Board not found or not authorized" });
    }

    res.json({ message: "Board shared successfully", board });
  } catch (err) {
    res.status(500).json({ error: "Failed to share board", details: err.message });
  }
};

// Unshare a board/canvas from a user
const unshareCanvas = async (req, res) => {
    try{
        const canvasId = req.params.id;
        const userId = req.user._id;
        const {email} = req.body;
        if(!email){
            return res.status(400).json({ error: "Email is required" });
        }

        const board = await boardService.unshareBoard(canvasId, userId, { email });
        if (!board) {
            return res.status(404).json({ error: "Board not found or not authorized" });
        }

        res.json({ message: "Board unshared successfully", board });
    } catch (err) {
        res.status(500).json({ error: "Failed to unshare board", details: err.message });
    }
};

// Delete a board/canvas
const deleteCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id;
        const userId = req.user._id;

        const deletedBoard = await boardService.deleteBoard(canvasId, userId);
        if (!deletedBoard) {
        return res.status(404).json({ error: "Board not found or not authorized" });
        }
        res.json({ message: "Board deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete board", details: err.message });
    }
};

const updateCanvas = async (req, res) => {
    try{
        const { title, elements } = req.body;
        const canvasId = req.params.id;
        const userId = req.user._id;

        const updatedBoard = await boardService.updateBoard(canvasId, userId, { title, elements });
        if (!updatedBoard) {
            return res.status(404).json({ error: "Board not found or not authorized" });
        }
        res.json(updatedBoard);
    } catch (err) {
        res.status(500).json({ error: "Failed to update board", details: err.message });
    }
}


module.exports = {
  createCanvas,
  updateCanvas,
  loadCanvas,
  shareCanvas,
  unshareCanvas,
  deleteCanvas
};
