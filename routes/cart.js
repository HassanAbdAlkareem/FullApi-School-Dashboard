const router = require("express").Router();
const Cart = require("../models/cart");

// CREATE Cart
router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    await newCart.save();
    res.status(200).send(newCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// fetch products ui and push in my cart
router.post("/products", async (req, res) => {
  try {
    const product = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      address: req.body.address,
    };

    const cart = await Cart.findOne({});
    cart.products.push(product);

    const updateCart = await Cart.updateOne({}, cart, {
      new: true,
    });

    res.status(200).send(updateCart);
    //
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get products from cart
router.get("/", async (req, res) => {
  try {
    const products = await Cart.find().populate({
      path: "products.productId",
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
