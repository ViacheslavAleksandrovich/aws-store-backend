const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Product = require('./models/product');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

// Синхронізація з базою
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected & synced');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
