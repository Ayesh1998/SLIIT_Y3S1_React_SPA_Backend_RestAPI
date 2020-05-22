const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const ProductComments = require("../models/productComments-model");


const addProductComment = async (req, res, next) => {
  const {
    product_id,
    user_email,
    user_firstName,
    user_lastName,
    comment
  } = req.body;

  const createdProductComment = new ProductComments({
    product_id,
    user_email,
    user_firstName,
    user_lastName,
    comment
  });

  try {
    console.log(createdProductComment);
    await createdProductComment.save();
    res.json({message: "Saved data to DB", save: 1});
  } catch (err) {
    const error = new HttpError("Saved failed, please try again.", 500);
    res.json({message: "Saved failed, please try again.", save: 0});
    return next(error);
  }

  res.status(201).json({productComment: createdProductComment.toObject({getters: true})});
};

const updateProductComment = async (req, res, next) => {
  ProductComments.findById(req.params.id)
    .then(productComment => {
      productComment.product_id = req.body.product_id;
      productComment.user_email = req.body.user_email;
      productComment.user_firstName = req.body.user_firstName;
      productComment.user_lastName = req.body.user_lastName;
      productComment.comment = req.body.comment;


      //exercise.duration = Number(req.body.duration);
      //exercise.date = Date.parse(req.body.date);


      productComment.save()
        .then(() => res.json({message: "Updated data to DB", save: 1}))
        .catch(err => res.status(400).json({message: "Updated failed, please try again.", save: 0}));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

const getProductComments = async (req, res, next) => {
  ProductComments.find()
    .then(productComments => res.json(productComments))
    .catch(err => res.status(400).json('Error: ' + err));
};

const getProductComment = async (req, res, next) => {
  ProductComments.findById(req.params.id)
    .then(productComment => res.json(productComment))
    .catch(err => res.status(400).json('Error: ' + err));
};

const deleteProductComment = async (req, res, next) => {

  ProductComments.findByIdAndDelete(req.params.id)
    .then(() => res.json({message: "Deleted data from DB", delete: 1}))
    .catch(err => res.status(400).json({message: "Deleted failed, please try again.", delete: 0}));

};


exports.addProductComment = addProductComment;
exports.updateProductComment = updateProductComment;
exports.getProductComments = getProductComments;
exports.getProductComment = getProductComment;
exports.deleteProductComment = deleteProductComment;


