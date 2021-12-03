const mongoose = require("mongoose");

const postQuestionSchema = new mongoose.Schema(
  {
    descQuestion: { type: String },
    subject: { type: String, required: true },
    imageQuestion: { type: String, default: "" },
    student: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post-Queston", postQuestionSchema);
