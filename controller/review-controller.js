const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const ReviewsAndRatings = require("../models/rating-model");

const getReview = async (req, res, next) => {
  let reviewList = [];
  try {
    reviewList = await ReviewsAndRatings.find({
      "itemID": req.params.itemID
    });
    if (reviewList == null) {
      return res.status(404).json({message: 'Cannot find Product'})
    } else {
      res.json(reviewList);
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
};

//Getting Review for selected item
// router.get('/getItemReview/:itemID', async (req,res) => {

const addReview = async (req, res, next) => {
  const review = new ReviewsAndRatings({
    itemID: req.body.itemID,
    clientName: req.body.clientName,
    review: req.body.review,
    rating: req.body.rating,
  })

  try {
    const newReview = await review.save()
    res.status(201).json(newReview)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
};


//Creating Review for selected item
//   router.post('/addItemReview', async (req,res) => {

exports.addReview = addReview;
exports.getReview = getReview;