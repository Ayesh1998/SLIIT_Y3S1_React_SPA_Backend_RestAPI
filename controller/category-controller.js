const HttpError = require('../models/http-errors')
const Category = require('../models/category-model')

const addCategory = async (req, res, next) => {
  let existingCategory

  const {
    categoryTitle,
    categoryDescription
  } = req.body

  try {
    existingCategory = await Category.findOne({
      categoryTitle: categoryTitle
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingCategory) {
    res.json({
      exists: true,
      message: 'A category with the same title already exists.'
    })
    return next(new HttpError('A category with the same title already exists.', 409))
  }

  const newCategory = new Category({
    categoryTitle,
    categoryDescription
  })

  try {
    await newCategory.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New product category added successfully!'
  })
}

const updateCategory = async (req, res, next) => {
  let category
  let existingCategory

  const {
    id
  } = req.params

  const {
    categoryTitle,
    categoryDescription
  } = req.body

  try {
    category = await Category.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingCategory = await Category.findOne({
      categoryTitle: categoryTitle
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingCategory && categoryTitle !== category.categoryTitle) {
    res.json({
      exists: true,
      message: 'A category with the same title already exists.'
    })
    return next(new HttpError('A category with the same title already exists.', 409))
  }

  category.categoryTitle = categoryTitle
  category.categoryDescription = categoryDescription

  try {
    await category.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Product category updated successfully!'
  })
}

const deleteCategory = async (req, res, next) => {
  let category

  const {
    id
  } = req.params

  try {
    category = await Category.findById(id)
    await category.remove()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Product category deleted successfully!'
  })
}

const getCategory = async (req, res, next) => {
  let category

  const {
    id
  } = req.params

  try {
    category = await Category.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(category)
}

const getCategoryList = async (req, res, next) => {
  let categoryList

  try {
    categoryList = await Category.find()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(categoryList)
}

exports.addCategory = addCategory
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory
exports.getCategory = getCategory
exports.getCategoryList = getCategoryList
