const router = require("express").Router();
const Message = require("../models/message");
const Teacher = require("../models/teacher");

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    await newMessage.save();
    res.status(200).send(newMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    })
      .populate("teacherId", "name profilePic")
      .populate("studentId", "name profilePic");
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
