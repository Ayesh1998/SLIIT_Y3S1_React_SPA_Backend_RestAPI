const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      //   required: true,
    },
    // userID: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    collection: "Products",
  }
);

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", ProductSchema);
