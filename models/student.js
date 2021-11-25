const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50, min: 3 },
    age: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      maxlength: 100,
      minlength: 10,
    },
    password: { type: String, maxlength: 200, minlength: 8 },
    phone: { type: String, trim: true, maxlength: 15, min: 9, trim: true },
    governorate: { type: String },
    Region: { type: String },
    profilePic: { type: String, default: "" },
    chooseTeacher: { type: [Object] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
