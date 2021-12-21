const mongoose = require("mongoose");

const Products = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  price: { type: String },
  status: {
    type: String,
    default: "قيد الانتظار",
  },
  imageProduct: { type: String, default: "" },
});
module.exports = mongoose.model("Product", Products);
