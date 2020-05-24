const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
    discount: {
      type: String,
      trim: true
    },
    colour: {
      type: String,
      required: true,
      trim: true
    },
    discription: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },

  },
  {
    timestamps: true,
    collection: "Products",
  }
);

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", ProductSchema);
