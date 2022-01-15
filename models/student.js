const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50, min: 3, required: true },
    age: { type: String },
    email: {
      type: String,
      unique: true,
      maxlength: 100,
      minlength: 10,
      required: true,
    },
    password: { type: String, maxlength: 200, minlength: 8, required: true },
    phone: { type: String, maxlength: 15, min: 9, trim: true },
    governorate: { type: String, required: true },
    Region: { type: String },
    profilePic: { type: String, default: "" },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
