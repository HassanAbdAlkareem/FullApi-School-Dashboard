const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    teacherId: { type: String, unique: true, required: true, ref: "Teacher" },
    studentsId: { type: Array, ref: "Student" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
