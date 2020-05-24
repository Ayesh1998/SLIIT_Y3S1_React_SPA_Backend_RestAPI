const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const itemRatingsAndReviewsSchema = new mongoose.Schema({
  itemID: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

itemRatingsAndReviewsSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "ReviewsAndRatings",
  itemRatingsAndReviewsSchema
);
