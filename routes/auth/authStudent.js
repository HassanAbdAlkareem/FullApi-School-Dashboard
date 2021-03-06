const router = require("express").Router();
const Student = require("../../models/student");
const jwt = require("jsonwebtoken");
const upload = require("../../middleware/uploadImage");

// register
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const Checkemail = await Student.findOne({ email: req.body.email });
    if (Checkemail)
      return res.status(404).send("This account is defined pleace login");
    //
    // const { path } = req.file;
    const newStudent = await new Student({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      governorate: req.body.governorate,
      Region: req.body.Region,
      profilePic: req?.file?.originalname,
    });
    //
    const token = jwt.sign(
      { email: newStudent.email, id: newStudent._id },
      "PRIVATE_KEY"
    );
    //
    res.status(200).json({ data: newStudent, token: token });
    await newStudent.save();
    //
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Checkemail = await Student.findOne({ email });
    if (!Checkemail) return res.status(404).send("This account was not found");
    //
    const Checkpassword = await Student.findOne({ password });
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
