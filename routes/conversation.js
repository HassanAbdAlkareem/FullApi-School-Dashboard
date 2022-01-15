const router = require("express").Router();
const Conversation = require("../models/conversation");

router.get("/teacher/:id", async (req, res) => {
  try {
    const getConversationForTeacher = await Conversation.findOne({
      teacherId: req.params.id,
    })
      .populate({ path: "teacherId", select: "name profilePic" })
      .populate({ path: "studentsId", select: "name profilePic" });
    res.status(200).send(getConversationForTeacher);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/student/:id", async (req, res) => {
  const getConversationForSudents = await Conversation.find({
    studentsId: { $in: [req.params.id] },
  })
    .populate({ path: "studentsId", select: "name profilePic" })
    .populate({ path: "teacherId", select: "name profilePic" });
  res.status(200).send(getConversationForSudents);
});

module.exports = router;
