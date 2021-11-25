const router = require("express").Router();
const Teacher = require("../models/teacher");
const verfiyToken = require("../middleware/verfiyToken");

// get students for teacher
router.get("/get-students/:id", verfiyToken, async (req, res) => {
  try {
    // i need id teacher from fron-end
    const teacher = await Teacher.findById(req.params.id);
    const getStudents = teacher.students.map((student) => student);
    getStudents.length > 0
      ? res.status(200).send(getStudents)
      : res.status(404).send("There are no students in common with you");
    //
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
