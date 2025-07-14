const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const Product = require("./models/product");
const User = require("./models/user");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const seedProducts = require("./utils/seed");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Синхронізація з базою + сидінг
sequelize.sync({ force: false }).then(async () => {
  console.log("Database connected & synced");
  await seedProducts();
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
