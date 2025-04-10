const { Cart } = require("../models/cart");
const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const userId = req.headers.id;
    const { products, totalPrice, address } = req.body;
    const payment = req.body.payment.toLowerCase();
    if (
      payment !== "cash" &&
      payment !== "credit card" &&
      payment !== "paypal"
    ) {
      return res
        .status(400)
        .json({ msg: "Payment by cash or credit card or paypal" });
    }
    const order = new Order({
      userId,
      products,
      totalPrice,
      payment,
      address,
    });
    await order.save();
    await Cart.findOneAndUpdate({ userId }, { products: [] });
    res.status(201).json({ msg: "Order is Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.headers.id }).populate(
      "products.productId",
      "name price image"
    );
    if (!orders.length) return res.status(404).json({ msg: "No Orders here" });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const status = req.query.status;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.status(200).json({ msg: `Order is ${status}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Order is Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
};
