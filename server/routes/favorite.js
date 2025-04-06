const { Router } = require("express");
const { authorization } = require("../middlewares/authorization");
const { findOneById } = require("../middlewares/find");
const { Product } = require("../models/product");
const {
  addToFavorite,
  deleteFromFavorites,
} = require("../controller/favorite");

const router = Router();

router.post(
  "/add-to-favorites/:id",
  authorization,
  findOneById(Product),
  addToFavorite
);

router.delete(
  "/delete-from-favorites/:id",
  authorization,
  findOneById(Product),
  deleteFromFavorites
);

module.exports = router;
