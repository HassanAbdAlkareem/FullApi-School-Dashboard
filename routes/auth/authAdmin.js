const router = require("express").Router();
const Admin = require("../../models/admin");

router.post("/register", async (req, res) => {
  try {
    const createAdmin = await new Admin(req.body);
    createAdmin.save();
    res.status(200).send(createAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const Checkemail = await Admin.findOne({ email });
    if (!Checkemail) return res.status(404).send("This admin not found");
    //
    const Checkpassword = await Admin.findOne({ password });
    if (!Checkpassword)
      return res.status(404).send("This admin not found Something is wrong");

    res.status(200).send(Checkemail);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
