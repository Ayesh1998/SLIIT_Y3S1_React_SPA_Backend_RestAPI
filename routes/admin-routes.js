const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category-controller")
const storeManagerController = require("../controller/store-manager-controller")

router.post("/AddCategory", categoryController.addCategory)
router.post("/UpdateCategory", categoryController.updateCategory)
router.post("/DeleteCategory", categoryController.deleteCategory)
router.post("/Category/:id", categoryController.getCategory)
router.post("/Category", categoryController.getCategoryList)

router.post("/AddStoreManager", storeManagerController.addStoreManager)
router.post("/UpdateStoreManager", storeManagerController.updateStoreManager)
router.post("/DeleteStoreManager", storeManagerController.deleteStoreManager)
router.post("/StoreManager/:id", storeManagerController.getStoreManager)
router.post("/StoreManager", storeManagerController.getStoreManagerList)

module.exports = router
