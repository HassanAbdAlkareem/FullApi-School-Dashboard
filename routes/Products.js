const router = require("express").Router();
const categoiresProducts = require("../models/categoires/categoiresProducts");
const upload = require("../middleware/uploadImage");
const Products = require("../models/products");

//  products
router.post("/:id", upload.single("imageProduct"), async (req, res) => {
  // id categoires
  try {
    const Product = await new Products({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      imageProduct: req?.file?.originalname,
    });
    Product.save();

    try {
      const categoire = await categoiresProducts.findById(req.params.id);
      categoire.products.push(Product);
      await categoiresProducts.findByIdAndUpdate(req.params.id, categoire, {
        new: true,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }

    res.status(200).send(Product);
    await Product.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const Product = await Products.find();
    res.status(200).send(Product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  //req.params.id for id product

  // req.body.idCategoire for find ond categoire
  const { idCategoire } = req.body;

  try {
    const Product = await Products.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(200).send(Product);
    //
    try {
      const categoires = await categoiresProducts.findById(idCategoire);
      const filter = categoires.products.filter((product) => {
        return product._id != req.params.id;
      });

      categoires.products = filter;
      const cate = await categoiresProducts.findByIdAndUpdate(
        idCategoire,
        categoires,
        {
          new: true,
        }
      );
      res.status(200).send(cate);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
