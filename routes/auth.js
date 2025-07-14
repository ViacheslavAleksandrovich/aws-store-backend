const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Реєстрація
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ where: { username } });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, password });
    res.json({ message: "User created", user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Вхід
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
