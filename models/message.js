const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: String },
    teacherId: { type: String, ref: "Teacher" },
    studentId: { type: String, ref: "Student" },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
