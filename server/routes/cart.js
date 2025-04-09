const { Router } = require("express");
const { authorization } = require("../middlewares/authorization");
const { findOneById } = require("../middlewares/find");
const { Product } = require("../models/product");
const {
  addToCart,
  deleteFromCart,
  getUserCart,
  deleteUserCart,
} = require("../controller/cart");
const { Cart } = require("../models/cart");

const router = Router();

router.post("/add-to-cart/:id", authorization, findOneById(Product), addToCart);

router.delete(
  "/delete-from-cart/:id",
  authorization,
  findOneById(Product),
  deleteFromCart
);

router.get("/get-user-cart", authorization, getUserCart);

router.delete(
  "/delete-user-cart/:id",
  authorization,
  findOneById(Cart),
  deleteUserCart
);

module.exports = router;
