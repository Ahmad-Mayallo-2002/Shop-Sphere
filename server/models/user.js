const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      required: true,
      default: "user",
    },
    shopName: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    shopDescription: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
  },
  { timestamps: true, collection: "Users" }
);

const User = model("User", UserSchema);

module.exports = { User };
