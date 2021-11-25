const router = require("express").Router();
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const verfiyToken = require("../middleware/verfiyToken");

router.get("/search-lesson", verfiyToken, async (req, res) => {
  // i need name lesson from fron end
  const getMatchLesson = req.query.lesson;

  // i need id student from fron-end
  const { idStudent } = req.body;
  try {
    //
    const getLesson = await Teacher.find({
      teachingSpecialty: {
        $in: [getMatchLesson],
      },
    });

    const student = await Student.findById(idStudent);

    const maping = getLesson.filter(
      (teacher) => teacher.governorate == student.governorate
    );
    //
    if (getLesson.length > 0) {
      return res.status(200).send(maping);
    } else {
      return res.status(205).send("not found this teacher");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/choose-teacher/:id", verfiyToken, async (req, res) => {
  // from front end in body
  const { studentId } = req.body;

  try {
    //push new teacher for student
    const student = await Student.findById(studentId);
    const teacher = await Teacher.findById(req.params.id).select(
      "-email -password  -age -students"
    );

    const verfiyForTeacher = student.chooseTeacher.find(
      (teacher) => teacher._id == req.params.id
    );
    if (verfiyForTeacher)
      return res.status(400).send("This teacher already exists");

    student.chooseTeacher.push(teacher);
    const updateStudent = await Student.findByIdAndUpdate(studentId, student, {
      new: true,
    });

    //push new student for teacher
    const teacher2 = await Teacher.findById(req.params.id);
    const student2 = await Student.findById(studentId).select(
      "-email -password -chooseTeacher"
    );

    teacher2.students.push(student2);
    const updateTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      teacher2,
      { new: true }
    );

    // ------------------------------------------- //
    res.status(200).json({
      student: updateStudent,
      teacher: updateTeacher,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/delete-teacher/:id", verfiyToken, async (req, res) => {
  // from front end in body
  const { studentId } = req.body;
  const student = await Student.findById(studentId);

  try {
    const teacher = await Teacher.findById(req.params.id);
    const verfiyForTeacher = student.chooseTeacher.find(
      (teacher) => teacher._id == req.params.id
    );

    if (!verfiyForTeacher)
      return res.status(400).send("This teacher is not in your teaching");

    student.chooseTeacher.pop(teacher);

    const findStudentAndDelete = await Student.findByIdAndUpdate(
      studentId,
      student,
      { new: true }
    );
    //
    res.status(200).send(findStudentAndDelete);
  } catch (error) {
    res.status(400).send(error.messaeg);
  }
});

module.exports = router;
