const router = require("express").Router();
const categoiresProducts = require("../models/categoires/categoiresProducts");
const upload = require("../middleware/uploadImage");

// categoires materails
router.post("/", upload.single("imageProduct"), async (req, res) => {
  try {
    const newCategoires = await new categoiresProducts({
      nameProduct: req.body.nameProduct,
      desc: req.body.desc,
      price: req.body.price,
      imageProduct: req?.file?.originalname,
    });
    newCategoires.save();
    res.status(200).send(newCategoires);
    await newCategoires.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const getCategoires = await categoiresProducts.find();
    res.status(200).send(getCategoires);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await categoiresProducts.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const categoiresproducts = await categoiresProducts.findByIdAndDelete(
      req.params.id,
      {
        new: true,
      }
    );
    res.status(200).send(categoiresproducts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
