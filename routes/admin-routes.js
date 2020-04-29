const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category-controller");
const storeManagerController = require("../controller/store-manager-controller");

router.post("/AddCategory", categoryController.addCategory);
router.post("/UpdateCategory", categoryController.updateCategory);

router.post("/AddStoreManager", storeManagerController.addStoreManager);
router.post("/UpdateStoreManager", storeManagerController.updateStoreManager);

module.exports = router;
