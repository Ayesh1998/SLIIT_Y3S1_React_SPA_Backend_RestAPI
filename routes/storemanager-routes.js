const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product-controller");

router.post("/addProduct", ProductController.addProduct);

module.exports = router;
