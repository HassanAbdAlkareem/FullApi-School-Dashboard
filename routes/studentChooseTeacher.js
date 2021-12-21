const router = require("express").Router();
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Converastion = require("../models/conversation");
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

    const filter = getLesson.filter(
      (teacher) => teacher.governorate == student.governorate
    );
    //
    if (getLesson.length > 0) {
      return res.status(200).send(filter);
    } else {
      return res.status(205).send("not found this teacher");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/choose-teacher/:id", async (req, res) => {
  // from front-end in body
  const { idStudent } = req.body;

  try {
    //push new teacher for student
    const student = await Student.findById(idStudent);
    const teacher = await Teacher.findById(req.params.id).select(
      "-email -password  -age -students -messages"
    );

    const verfiyForTeacher = student.chooseTeacher.find(
      (teacher) => teacher._id == req.params.id
    );
    if (verfiyForTeacher)
      return res.status(400).send("This teacher already exists");

    student.chooseTeacher.push(teacher);
    const updateStudent = await Student.findByIdAndUpdate(idStudent, student, {
      new: true,
    });

    const conversationTeacher = await Converastion.findOne({
      teacherId: req.params.id,
    });
    conversationTeacher.studentsId.push(idStudent);

    await Converastion.updateOne(
      { teacherId: req.params.id },
      conversationTeacher
    );

    console.log(conversationTeacher);
    //push new student for teacher
    const teacher2 = await Teacher.findById(req.params.id);
    const student2 = await Student.findById(idStudent).select(
      "-email -password -chooseTeacher"
    );

    teacher2.students.push(student2);
    await Teacher.findByIdAndUpdate(req.params.id, teacher2, { new: true });

    // ------------------------------------------- //
    res.status(200).json(updateStudent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
