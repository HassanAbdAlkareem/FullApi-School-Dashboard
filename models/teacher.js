const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50, min: 3 },
    age: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      maxlength: 100,
      minlength: 5,
    },
    password: { type: String, maxlength: 200, minlength: 8 },
    phone: { type: String, trim: true, maxlength: 15, min: 9, trim: true },
    teachingSpecialty: { type: Array },
    governorate: { type: String },
    Region: { type: String },
    profilePic: { type: String, default: "" },
    students: { type: [Object] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
