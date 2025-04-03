const { Router } = require("express");
const { authorization } = require("../middlewares/authorization");
const { findAll, findOneById, checkVendor } = require("../middlewares/find");
const { Product } = require("../models/product");
const multer = require("multer");
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  addRate,
} = require("../controller/product");

const router = Router();
const upload = multer();
router.get("/get-products", findAll(Product), getProducts);

router.get("/get-products/:id", findOneById(Product), getProduct);

router.post(
  "/add-product",
  authorization,
  upload.single("image"),
  checkVendor,
  addProduct
);

router.delete(
  "/delete-product/:id",
  authorization,
  findOneById(Product),
  checkVendor,
  deleteProduct
);

router.patch(
  "/update-product/:id",
  authorization,
  upload.single("image"),
  findOneById(Product),
  checkVendor,
  updateProduct
);

router.post("/add-rate/:id", authorization, findOneById(Product), addRate);

module.exports = router;
