const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comment-controller');

router.post('/product-comment', CommentsController.addProductComment);
router.post('/product-comment/update/:id', CommentsController.updateProductComment);
router.get('/product-comment', CommentsController.getProductComments);
router.get('/product-comment/:id', CommentsController.getProductComment);
router.delete('/product-comment/:id', CommentsController.deleteProductComment);


module.exports = router;
