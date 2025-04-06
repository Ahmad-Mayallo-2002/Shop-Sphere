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
        type: Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { collection: "carts", timestamps: true }
);

const Cart = model("Cart", FavoriteSchema);

module.exports = { Cart };
