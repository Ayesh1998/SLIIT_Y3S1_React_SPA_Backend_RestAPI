const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const WishListSchema = new Schema(
  {
    productID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Wishlist",
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Wishlist", WishListSchema);
