const mongoose = require("mongoose");

const categoriesgovernorate = new mongoose.Schema(
  {
    nameGovernorate: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Categories-Governorats",
  categoriesgovernorate
);
