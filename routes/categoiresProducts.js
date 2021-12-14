const categoiresProducts = require("../models/categoires/categoiresProducts");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const newCategoiresProducts = new categoiresProducts(req.body);
    await newCategoiresProducts.save();
    res.status(200).send(newCategoiresProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const getCategoiresProducts = await categoiresProducts.find();
    res.status(200).send(getCategoiresProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getSinglCategoireProducts = await categoiresProducts.findById(
      req.params.id
    );
    res.status(200).send(getSinglCategoireProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCate = await categoiresProducts.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteCate = await categoiresProducts.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(deleteCate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
