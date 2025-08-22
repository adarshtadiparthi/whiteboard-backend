const express = require('express');
const {signin,signup,getMe} = require('../controllers/userController');
const {authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', authMiddleware, getMe);

module.exports = router;