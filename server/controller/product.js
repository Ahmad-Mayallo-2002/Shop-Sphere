const { Product } = require("../models/product");
const { writeFileToPublic } = require("../utils/writeFile");

const serverError = "Internal Server Error";

const addProduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res.status(400).json({ msg: "Product image is required" });
    const { name, description, price, discount, category, stock, brandName } =
      req.body;
    const image = writeFileToPublic(file);
    const product = new Product({
      name,
      description,
      price,
      discount,
      category,
      brandName,
      stock,
      vendorId: req.headers.id,
      image,
    });
    await product.save();
    res.status(201).json({ msg: "Product is added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.headers.id })
      .populate("vendorId", "username")
      .limit(req.query.limit)
      .skip(req.query.skip);
    const requestBody = {};
    if (req.headers.role === "vendor") requestBody.vendorId = req.headers.id;
    const length = await Product.countDocuments(requestBody);

    res.status(200).json({ products, length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "vendorId",
      select: "shopName username",
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "vendorId",
      select: "_id role",
    });
    if (
      product.vendorId._id.toString() === req.headers.id ||
      product.vendorId.role === "admin"
    ) {
      await product.deleteOne();
    } else {
      return res.status(400).json({ msg: "Access is denied" });
    }
    res.status(200).json({ msg: "Product is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

const updateProduct = async (req, res) => {
  try {
    const file = req.file;
    const { name, description, price, discount, category, stock, brandName } =
      req.body;
    const requestBody = {};
    if (name) requestBody.name = name;
    if (description) requestBody.description = description;
    if (price) requestBody.price = price;
    if (discount) requestBody.discount = discount;
    if (category) requestBody.category = category;
    if (stock) requestBody.stock = stock;
    if (brandName) requestBody.brandName = brandName;
    if (!Object.keys(requestBody).length)
      return res.status(404).json({ msg: "Enter at Least one Field" });
    let image;
    if (file) {
      image = writeFileToPublic(file);
      requestBody.image = image;
    }
    await Product.findByIdAndUpdate(req.params.id, { $set: requestBody });
    res.status(200).json({ msg: "Product is updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

const addRate = async (req, res) => {
  try {
    const { value, comment } = req.body;
    const userId = req.headers.id;
    const product = await Product.findById(req.params.id);
    product.ratings.push({ value, comment, userId });
    await product.save();
    res.status(201).json({ msg: "Product is rated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: serverError });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  addRate,
};
