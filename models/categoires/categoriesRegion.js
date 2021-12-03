const mongoose = require("mongoose");

const categoriesRegion = new mongoose.Schema(
  {
    nameRegion: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories-Region", categoriesRegion);
