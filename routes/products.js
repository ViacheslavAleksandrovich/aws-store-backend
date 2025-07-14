const express = require("express");
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Створення товару (тільки авторизованим)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = await Product.create({ name, description, price, imageUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
