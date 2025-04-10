const { Router } = require("express");
const { authorization } = require("../middlewares/authorization");
const { findAll, checkAdmin, findOneById } = require("../middlewares/find");
const Order = require("../models/order");
const {
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrderStatus,
  createOrder,
  getUserOrders,
} = require("../controller/order");

const router = Router();

router.get(
  "/get-all-orders",
  authorization,
  checkAdmin,
  findAll(Order),
  getAllOrders
);

router.get(
  "/get-all-orders/:id",
  authorization,
  findOneById(Order),
  getSingleOrder
);

router.get("/get-user-orders", authorization, getUserOrders);

router.delete(
  "/delete-user/:id",
  authorization,
  findOneById(Order),
  deleteOrder
);

router.patch(
  "/update-order-status/:id",
  authorization,
  findOneById(Order),
  updateOrderStatus
);

router.post("/create-order", authorization, createOrder);

module.exports = router;
