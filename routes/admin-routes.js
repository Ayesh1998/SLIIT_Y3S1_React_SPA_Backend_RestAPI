const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category-controller")
const storeManagerController = require("../controller/store-manager-controller")

router.post("/AddCategory", categoryController.addCategory)
router.post("/UpdateCategory", categoryController.updateCategory)
router.post("/DeleteCategory", categoryController.deleteCategory)
router.post("/Category", categoryController.getCategory)
router.post("/Categories", categoryController.getCategoryList)

router.post("/AddStoreManager", storeManagerController.addStoreManager)
router.post("/UpdateStoreManager", storeManagerController.updateStoreManager)
router.post("/DeleteStoreManager", storeManagerController.deleteStoreManager)
router.post("/StoreManager", storeManagerController.getStoreManager)
router.post("/StoreManagers", storeManagerController.getStoreManagerList)

module.exports = router
