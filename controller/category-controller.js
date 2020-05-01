const HttpError = require('../models/http-errors')
const Category = require('../models/category-model')

const addCategory = async (req, res, next) => {
  let existingCategory

  const {
    categoryTitle,
    categoryDescription,
    categoryImage
  } = req.body

  try {
    existingCategory = await Category.findOne({
      categoryTitle: categoryTitle
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  if (existingCategory) {
    const error = new HttpError('A category with the same title already exists.', 409)
    res.json({
      message: 'A category with the same title already exists.'
    })
    return next(error)
  }

  const newCategory = new Category({
    categoryTitle,
    categoryDescription,
    categoryImage
  })

  try {
    await newCategory.save()
    res.json({
      message: 'New product category added!'
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(201).json({
    category: newCategory.toObject({
      getters: true
    })
  })

  res.json({
    message: 'New product category added successfully!',
    category: newCategory.toObject({
      getters: true
    })
  })
}

const updateCategory = async (req, res, next) => {
  let category

  const {
    id,
    categoryTitle,
    categoryDescription,
    categoryImage
  } = req.body

  try {
    category = await Category.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  category.categoryTitle = categoryTitle
  category.categoryDescription = categoryDescription
  category.categoryImage = categoryImage

  try {
    await category.save()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    category: category.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Product category updated successfully!',
    category: category.toObject({
      getters: true
    })
  })
}

const deleteCategory = async (req, res, next) => {
  let category

  const {
    id
  } = req.body

  try {
    category = await Category.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  try {
    await category.remove()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    category: category.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Product category deleted successfully!',
    category: category.toObject({
      getters: true
    })
  })
}

const getCategory = async (req, res, next) => {
  let category

  const {
    id
  } = req.body

  try {
    category = await Category.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    category: category.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Product category retrieved successfully!',
    category: category.toObject({
      getters: true
    })
  })

  res.send(category)
}

const getCategoryList = async (req, res, next) => {
  let categoryList

  try {
    categoryList = await Category.find()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.send(categoryList)
}

exports.addCategory = addCategory
exports.updateCategory = updateCategory
exports.deleteCategory = deleteCategory
exports.getCategory = getCategory
exports.getCategoryList = getCategoryList
