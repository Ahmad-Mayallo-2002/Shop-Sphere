const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
          default: 1,
        },
      },
    ],
  },
  { collection: "carts", timestamps: true }
);

const Cart = model("Cart", CartSchema);

module.exports = { Cart };
