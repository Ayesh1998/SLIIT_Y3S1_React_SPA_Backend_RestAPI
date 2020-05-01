const express = require('express')
const router = express.Router()

const CategoryController = require('../controller/category-controller')
const StoreManagerController = require('../controller/store-manager-controller')

router.post('/AddCategory', CategoryController.addCategory)
router.put('/UpdateCategory', CategoryController.updateCategory)
router.delete('/DeleteCategory', CategoryController.deleteCategory)
router.get('/Category', CategoryController.getCategory)
router.get('/Categories', CategoryController.getCategoryList)

router.post('/AddStoreManager', StoreManagerController.addStoreManager)
router.put('/UpdateStoreManager', StoreManagerController.updateStoreManager)
router.delete('/DeleteStoreManager', StoreManagerController.deleteStoreManager)
router.get('/StoreManager', StoreManagerController.getStoreManager)
router.get('/StoreManagers', StoreManagerController.getStoreManagerList)

module.exports = router
