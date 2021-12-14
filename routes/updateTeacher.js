const router = require("express").Router();
const Teacher = require("../models/teacher");

router.put("/:id", async (req, res) => {
  try {
    const updateTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        teachingSpecialty: req.body.teachingSpecialty,
        governorate: req.body.governorate,
        Region: req.body.Region,
        profilePic: req?.file?.originalname,
      },
      { new: true }
    );
    res.status(200).send(updateTeacher);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
