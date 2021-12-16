const router = require("express").Router();
const Cart = require("../models/cart");
const Products = require("../models/products");

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
router.post("/products/:id", async (req, res) => {
  try {
    const product = {
      productId: req.body.productId,
      quantity: req.body.quantity,
    };

    const cart = await Cart.findById(req.params.id);
    cart.products.push(product);

    const updateCart = await Cart.findByIdAndUpdate(req.params.id, cart, {
      new: true,
    });

    res.status(200).send(updateCart);
    //
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get products from cart
router.get("/:id", async (req, res) => {
  try {
    const products = await Cart.find().populate({
      path: "products.productId",
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// exports.getAllBooks = async (req, res) => {
//   try {
//     let data = await BookModel.findOne().populate({
//       path: "copies.loaned_to",
//       select:
//         "first_name lastName phone_number address user_name email notifications",
//     });
//     res.status(200).json({ data: [...data], success: true });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, msg: err.message });
//   }
// };

module.exports = router;
