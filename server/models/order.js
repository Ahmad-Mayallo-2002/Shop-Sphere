const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        _id: false,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ["cash", "credit card", "paypal"],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { collection: "Orders", timestamps: true }
);

const Order = model("Order", OrderSchema);

module.exports = Order;
