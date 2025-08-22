const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    const { user, token } = await userService.signup(req.body.email, req.body.password);
    res.status(201).json({ user, token });
  } catch (err) {
    const msg = err?.code === 11000 ? "Email already in use" : err.message;
    res.status(400).json({ error: msg });
  }
};

const signin = async (req, res) => {
  try {
    const { user, token } = await userService.signin(req.body.email, req.body.password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await userService.getMe(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, signin, getMe };