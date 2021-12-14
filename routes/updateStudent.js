const router = require("express").Router();
const Students = require("../models/student");

router.put("/:id", async (req, res) => {
  try {
    const updateStudents = await Students.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        governorate: req.body.governorate,
        Region: req.body.Region,
        profilePic: req?.file?.originalname,
      },
      { new: true }
    );
    res.status(200).send(updateStudents);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
