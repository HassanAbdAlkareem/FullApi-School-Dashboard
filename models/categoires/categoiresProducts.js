const mongoose = require("mongoose");

const categoriesProducts = new mongoose.Schema(
  {
    nameProduct: { type: String, required: true },
    products: [Object],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories-Products", categoriesProducts);
