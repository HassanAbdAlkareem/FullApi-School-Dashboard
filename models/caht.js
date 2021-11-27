const mongoose = require("mongoose");

const cahtSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    infoSender: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("caht", cahtSchema);
