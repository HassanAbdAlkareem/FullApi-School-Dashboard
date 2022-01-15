const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50, minlength: 3, required: true },
    age: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      maxlength: 100,
      minlength: 5,
    },
    password: { type: String, maxlength: 200, minlength: 8, required: true },
    phone: { type: String, maxlength: 15, min: 9, trim: true },
    teachingSpecialty: { type: Array },
    governorate: { type: String, required: true },
    Region: { type: String },
    profilePic: { type: String, default: "" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
