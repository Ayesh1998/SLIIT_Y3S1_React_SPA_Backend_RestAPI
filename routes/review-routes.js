const express = require("express");
const router = express.Router();

const ReviewController = require("../controller/review-controller");

router.get('/getItemReview/:itemID', ReviewController.getReview);
router.post('/addItemReview', ReviewController.addReview);


module.exports = router;
