const mongoose = require("mongoose");

const categoriesMaterails = new mongoose.Schema(
  {
    nameMaterial: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories-Materails", categoriesMaterails);
