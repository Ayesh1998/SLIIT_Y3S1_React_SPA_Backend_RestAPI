const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      //   required: true,
    },
    category: {
      type: String,
      //   required: true,
    },
    brand: {
      type: String,
      //   required: true,
    },
    price: {
      type: String,
      //   required: true,
    },
    discount: {
      type: String,
      //   required: true,
    },
    colour: {
      type: String,
      //   required: true,
    },
    discription: {
      type: String,
      //   required: true,
    }, 
    image: {
      type: String,
      //   required: true,
    },   
    
  },
  {
    timestamps: true,
    collection: "Products",
  }
);

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", ProductSchema);
