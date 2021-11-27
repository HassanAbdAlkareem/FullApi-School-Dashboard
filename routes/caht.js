const router = require("express").Router();
const Chat = require("../models/caht");
const Teacher = require("../models/teacher");
const Student = require("../models/student");

// caht teacher
router.post("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select(
      "name profilePic"
    );

    const newMessage = await new Chat({
      message: req.body.message,
      infoSender: teacher,
    });

    newMessage.save();
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/teacher/:id", async (req, res) => {
  // here i mean i need id message from params
  const { idTeaher } = req.body;

  try {
    const message = await Chat.findById(req.params.id);
    if (message.infoSender._id == idTeaher) {
      const deleteMessage = await Chat.findByIdAndDelete(req.params.id, {
        new: true,
      });
      res.status(200).send(deleteMessage);
    } else {
      res.status(400).send("you can't delete this message");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// chat student
router.post("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select(
      "name profilePic"
    );
    const newMessage = await new Chat({
      message: req.body.message,
      infoSender: student,
    });
    newMessage.save();
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/student/:id", async (req, res) => {
  // here i mean i need id message from params
  const { idStudent } = req.body;

  try {
    const message = await Chat.findById(req.params.id);
    if (message.infoSender._id == idStudent) {
      const deleteMessage = await Chat.findByIdAndDelete(req.params.id, {
        new: true,
      });
      res.status(200).send(deleteMessage);
    } else {
      res.status(400).send("you can't delete this message");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//

router.get("/", async (req, res) => {
  try {
    const messages = await Chat.find();
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
  //   const teacher = await Teacher.findById(req.params.id).select(
  //     "students name"
  //   );
  //   const messages = await Chat.find();
  //   const map = messages.map((message) => message);
  //   const getMessagesStudentForTeacher = messages.map((message) => {
  //     return teacher.students.filter((student) => {
  //       return message.infoSender.name === student.name;
  //     });
  //   });
  //   // console.log(getMessagesStudentForTeacher);
  //   const getmessagesTeacher = await Chat.find();
  //   const messagesTeacher = getmessagesTeacher.filter(
  //     (message) => message.infoSender.name == teacher.name
  //   );
  //   res.status(200).json({
  //     messagesStudent: getMessagesStudentForTeacher,
  //     messagesTeacher: messagesTeacher,
  //   });
  //
});

module.exports = router;
