const mongoose = require("mongoose");

const categories = new mongoose.Schema(
  {
    nameMaterial: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categoires", categories);
