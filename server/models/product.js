const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
      required: false,
    },
    vendorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 1,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    ratings: [
      {
        value: {
          type: Number,
          min: 0,
          default: 0,
        },
        comment: {
          type: String,
          required: false,
        },
        userId: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { collection: "Products", timestamps: true }
);

const Product = model("Product", ProductSchema);

module.exports = { Product };
