const mongoose = require("mongoose");

const categoriesProducts = new mongoose.Schema(
  {
    nameProduct: { type: String, required: true },
    desc: { type: String },
    price: { type: String, required: true },
    status: {
      type: Number,
      minlength: 0,
      maxlength: 2,
      default: 0,
    },
    imageProduct: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories-Products", categoriesProducts);
