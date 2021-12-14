const router = require("express").Router();
const Teacher = require("../models/teacher");

router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .sort({ _id: -1 })
      .limit(10)
      .select("-password -email -students");
    res.status(200).send(teachers);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
