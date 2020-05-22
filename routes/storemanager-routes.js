const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product-controller");

router.post("/product", ProductController.addProduct);
router.post("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);
router.get("/product", ProductController.getProductList);
router.get("/product/:id", ProductController.getProduct);

module.exports = router;
