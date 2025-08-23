const express = require("express");
const { createCanvas, updateCanvas, loadCanvas, shareCanvas, unshareCanvas, deleteCanvas} = require("../controllers/boardController");
const {authMiddleware} = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create", authMiddleware, createCanvas); 
router.put("/update/:id", authMiddleware, updateCanvas);
router.get("/load/:id", authMiddleware, loadCanvas); 
router.put("/share/:id", authMiddleware, shareCanvas); 
router.put("/unshare/:id", authMiddleware, unshareCanvas);
router.delete("/delete/:id", authMiddleware, deleteCanvas); 

module.exports = router;