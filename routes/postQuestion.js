const router = require("express").Router();
const PostQuestion = require("../models/postQuestion");
const upload = require("../middleware/uploadImage");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const verfiy = require("../middleware/verfiyToken");

// post question for student
router.post("/", [verfiy, upload.single("imageQuestion")], async (req, res) => {
  const { idStudent } = req.body;
  const student = await Student.findById(req.body.idStudent).select(
    "name _id governorate"
  );
  try {
    const newPostQuestion = await new PostQuestion({
      student: student,
      descQuestion: req.body.descQuestion,
      subject: req.body.subject,
      imageQuestion: req?.file?.path,
    });
    //
    await newPostQuestion.save();
    //
    res.status(200).send(newPostQuestion);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get quetion match for teacher
router.get("/:id", verfiy, async (req, res) => {
  // i need id al teacher
  try {
    const teacher = await Teacher.findById(req.params.id);
    const getQuestions = await PostQuestion.find({
      subject: teacher.teachingSpecialty[0],
    });

    getQuestions
      ? res.status(200).send(getQuestions)
      : res.status(404).send("no questions yet");
  } catch (error) {
    res.status(412).send(error.message);
  }
});

router.delete("/:id", verfiy, async (req, res) => {
  // i need id post question
  const postQuestion = await PostQuestion.findById(req.params.id);

  // i need id student in body
  if (postQuestion.student._id == req.body.idStudent) {
    postQuestion.delete();
    res.status(200).send(postQuestion);
  } else {
    res.status(400).send("you can not delete this question");
  }
});

module.exports = router;
