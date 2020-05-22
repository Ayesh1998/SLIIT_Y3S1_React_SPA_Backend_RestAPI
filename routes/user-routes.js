const express = require("express");
const router = express.Router();

const UsersController = require("../controller/user-controller");
const WishListController = require("../controller/wishlist-controller");

router.post("/signup", UsersController.signup);
router.post("/login", UsersController.login);
router.post("/updatePasswordRequest", UsersController.updatePasswordRequest);
router.post("/updatePassword", UsersController.updatePassword);
router.post("/addToWishList", WishListController.addToWishList);
router.delete(
  "/deleteFromWishList/:userID/:productID",
  WishListController.deleteWishList
);
router.get("/getWishList/:userID", WishListController.getWishList);
router.delete(
  "/deleteWishList/:userID",
  WishListController.deleteWishListAllUser
);

//harshani add kale
router.get('/current-user', UsersController.getUsers);

module.exports = router;
