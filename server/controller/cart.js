const { Cart } = require("../models/cart");

const getUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.headers.id }).populate(
      "products"
    );
    if (!userCart) return res.status(404).json({ msg: "Not Found Cart" });
    res.status(200).json(userCart.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      userId: req.headers.id,
    }).populate("products");
    if (!userCart) return res.status(404).json({ msg: "Not Found Cart" });
    await userCart.deleteOne();
    return res.status(200).json({ msg: "Cart is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userCart = await Cart.findOne({
      userId: req.headers.id,
    });
    if (userCart) {
      const currentIndex = userCart.products.findIndex(
        (product) => product._id.toString() === productId
      );
      if (currentIndex !== -1)
        return res.status(400).json({ msg: "This product is already in cart" });
      userCart.products.push(productId);
      await userCart.save();
    } else {
      const newCart = new Cart({
        userId: req.headers.id,
        products: [productId],
      });
      await newCart.save();
    }
    return res.status(201).json({ msg: "Product is added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userCart = await Cart.findOne({
      userId: req.headers.id,
    });
    if (!userCart) return res.status(404).json({ msg: "Not Found Cart" });
    const currentIndex = userCart.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (currentIndex === -1)
      return res.status(404).json({ msg: "This product is not found in cart" });
    userCart.products.splice(currentIndex, 1);
    await userCart.save();
    return res.status(200).json({ msg: "Product is deleted from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  addToCart,
  deleteFromCart,
  getUserCart,
  deleteUserCart,
};
