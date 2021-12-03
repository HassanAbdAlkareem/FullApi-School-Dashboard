const router = require("express").Router();
const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
const CategoriesMaterails = require("../../models/categoires/categoriesMaterails");

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find().select(
      "name phone teachingSpecialty governorate profilePic students"
    );
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find().select(
      "name phone governorate profilePic chooseTeacher"
    );
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
