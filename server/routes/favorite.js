const { Router } = require("express");
const { authorization } = require("../middlewares/authorization");
const { findOneById } = require("../middlewares/find");
const { Product } = require("../models/product");
const {
  addToFavorite,
  deleteFromFavorites,
  getUserFavorites,
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

router.get("/get-user-favorites", authorization, getUserFavorites);

module.exports = router;
