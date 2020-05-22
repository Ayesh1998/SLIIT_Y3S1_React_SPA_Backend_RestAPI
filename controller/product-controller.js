const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const Product = require("../models/product-model");

const addProduct = async (req, res, next) => {
  const { 
    title,
    category,
    brand,
    price,
    discount,
    colour,
    discription,
    image,
  } = req.body;

  const ProductItme = new Product({
    title,
    category,
    brand,
    price,
    discount,
    colour,
    discription,
    image
  });
  let existingProduct;

  try {
    existingProduct = await Product.findOne({ title: title });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    res.json({
      message: "Signing up failed, please try again later.",
      login: 0,
    });
    return next(error);
  }

  if (existingProduct) {
    const error = new HttpError(
      "User already exists, please login instead.",
      422
    );
    res.json({
      message: "User already exists, please login instead."
    });
    return next(error);
  }

  try {
    console.log(ProductItme);
    await ProductItme.save();
    // res.json({ message: "Added Succeefully", added: 1 });
  } catch (err) {
    const error = new HttpError("Adding failed, please try again.", 500);
    res.json({ message: "Adding failed, please try again.", added: 0 });
    return next(error);
  }

  res.status(201).json({
    product: ProductItme.toObject({ getters: true }),
    message: "Added Succeefully",
    added: 1,
  });
};

const getProductList = async (req, res, next) => {
  Product.find()
    .then(productList => res.json(productList))
    .catch(err => res.status(400).json("Error: " + err));
};




const updateProduct = async (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      product.title = req.body.title;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.colour = req.body.colour;
      product.discription = req.body.discription;
      product.image = req.body.image;

      product.save()
        .then(() => res.json({message: "Updated data to DB", save: 1}))
        .catch(err => res.status(400).json({message: "Updated failed, please try again.", save: 0}));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};




exports.addProduct = addProduct;
 exports.updateProduct = updateProduct;
 exports.deleteProduct = deleteProduct;
 exports.getProductList = getProductList;
 exports.getProduct = getProduct;