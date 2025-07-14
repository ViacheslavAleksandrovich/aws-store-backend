const Product = require("../models/product");

async function seedProducts() {
  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate([
      {
        name: "Ноутбук Lenovo",
        description: "Ідеально для навчання",
        price: 15999,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Мишка Logitech",
        description: "Бездротова мишка з гарною ергономікою",
        price: 899,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Монітор Samsung",
        description: '24" FullHD монітор',
        price: 4499,
        imageUrl: "https://via.placeholder.com/150",
      },
    ]);
    console.log("Товари успішно додані!");
  }
}

module.exports = seedProducts;
