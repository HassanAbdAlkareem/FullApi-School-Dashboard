const router = require("express").Router();
const categoriesMaterails = require("../models/categoires/categoriesMaterails");
const categoriesGovernorates = require("../models/categoires/categoriesGovernorates");
const categoiresRegoin = require("../models/categoires/categoriesRegion");

// categoires materails
router.post("/materails", async (req, res) => {
  try {
    const newCategoires = await new categoriesMaterails(req.body);
    res.status(200).send(newCategoires);
    await newCategoires.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/materails", async (req, res) => {
  try {
    const getCategoires = await categoriesMaterails.find();
    res.status(200).send(getCategoires);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/materails/:id", async (req, res) => {
  try {
    await categoriesMaterails.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).send("categoires has been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// categoires governorates
router.post("/governorates", async (req, res) => {
  try {
    const newCategoires = await new categoriesGovernorates(req.body);
    res.status(200).send(newCategoires);
    await newCategoires.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//
router.get("/governorates", async (req, res) => {
  try {
    const getCategoires = await categoriesGovernorates.find();
    res.status(200).send(getCategoires);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/governorates/:id", async (req, res) => {
  try {
    await categoriesGovernorates.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).send("categoires has been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//

// categoires region
router.post("/region", async (req, res) => {
  try {
    const newCategoires = await new categoiresRegoin(req.body);
    res.status(200).send(newCategoires);
    await newCategoires.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//
router.get("/region", async (req, res) => {
  try {
    const getCategoires = await categoiresRegoin.find();
    res.status(200).send(getCategoires);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/region/:id", async (req, res) => {
  try {
    await categoiresRegoin.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).send("categoires has been deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//

module.exports = router;
