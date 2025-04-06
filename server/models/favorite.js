const { Schema, model, Types } = require("mongoose");

const FavoriteSchema = new Schema(
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
  { collection: "favorites", timestamps: true }
);

const Favorite = model("Favorite", FavoriteSchema);

module.exports = { Favorite };
