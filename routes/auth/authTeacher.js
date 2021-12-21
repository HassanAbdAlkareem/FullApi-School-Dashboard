const router = require("express").Router();
const Teacher = require("../../models/teacher");
const jwt = require("jsonwebtoken");
const upload = require("../../middleware/uploadImage");
const Conversation = require("../../models/conversation");

// register
router.post("/register", upload.single("profilePic"), async (req, res) => {
  const Checkemail = await Teacher.findOne({ email: req.body.email });
  if (Checkemail)
    return res.status(404).send("This account is defined pleace login ");

  try {
    const newTeacher = await new Teacher({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      teachingSpecialty: req.body.teachingSpecialty,
      governorate: req.body.governorate,
      Region: req.body.Region,
      profilePic: req?.file?.originalname,
    });

    const token = jwt.sign(
      { email: newTeacher.email, id: newTeacher._id },
      "PRIVATE_KEY"
    );

    await newTeacher.save();
    await Conversation.create({ teacherId: newTeacher._id });

    res.status(200).json({ data: newTeacher, token: token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Checkemail = await Teacher.findOne({ email });
    if (!Checkemail) return res.status(404).send("This account was not found");
    //
    const Checkpassword = await Teacher.findOne({ password });
    if (!Checkpassword)
      return res.status(404).send("This account was not found");

    const token = jwt.sign(
      { email: Checkemail.email, id: Checkemail._id },
      "PRIVATE_KEY"
    );

    res.status(200).json({ data: Checkemail, token: token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
