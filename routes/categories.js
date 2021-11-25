const router = require("express").Router();
const Categoires = require("../models/categories");

router.post("/", async (req, res) => {
  try {
    const newCategoires = await new Categoires(req.body);
    res.status(200).send(newCategoires);
    await newCategoires.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//
router.get("/", async (req, res) => {
  try {
    const getCategoires = await Categoires.find();
    res.status(200).send(getCategoires);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Categoires.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).send("categoires has been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
