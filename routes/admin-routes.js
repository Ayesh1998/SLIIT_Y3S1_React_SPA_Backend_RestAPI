const express = require('express')
const router = express.Router()

const CategoryController = require('../controller/category-controller')
const StoreManagerController = require('../controller/store-manager-controller')
const AdminController = require('../controller/admin-controller')

router.post('/category', CategoryController.addCategory)
router.put('/category/:id', CategoryController.updateCategory)
router.delete('/category/:id', CategoryController.deleteCategory)
router.get('/category/:id', CategoryController.getCategory)
router.get('/category', CategoryController.getCategoryList)

router.post('/admin', AdminController.addAdmin)
router.put('/admin/:id', AdminController.updateAdmin)
router.delete('/admin/:id', AdminController.deleteAdmin)
router.get('/admin/:id', AdminController.getAdmin)
router.get('/admin', AdminController.getAdminList)

router.post('/storemanager', StoreManagerController.addStoreManager)
router.put('/storemanager/:id', StoreManagerController.updateStoreManager)
router.delete('/storemanager/:id', StoreManagerController.deleteStoreManager)
router.get('/storemanager/:id', StoreManagerController.getStoreManager)
router.get('/storemanager', StoreManagerController.getStoreManagerList)

module.exports = router
