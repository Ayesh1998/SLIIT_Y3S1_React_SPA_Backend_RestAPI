const httpError = require("../models/http-errors")
const User = require("../models/users-model")

const addStoreManager = async (req, res, next) => {
  let existingUser

  const {
    firstName,
    lastName,
    email,
    teleNo,
    password,
    passwordResetQuestion,
    answer
  } = req.body

  try {
    existingUser = await User.findOne({
      email: email
    })
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  if (existingUser) {
    const error = new httpError("A user with the same email already exists.", 409)
    res.json({
      message: "A user with the same email already exists."
    })
    return next(error)
  }

  const newStoreManager = new User({
    firstName,
    lastName,
    teleNo,
    email,
    password,
    passwordResetQuestion,
    answer,
    type: 'Store Manager'
  })

  try {
    await newStoreManager.save()
    res.json({
      message: "New store manager added!"
    })
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(201).json({
    category: newStoreManager.toObject({
      getters: true
    })
  })

  res.json({
    message: "New store manager added successfully!",
    category: newStoreManager.toObject({
      getters: true
    })
  })
}

const updateStoreManager = async (req, res, next) => {
  let user

  const {
    id,
    firstName,
    lastName,
    teleNo,
    email
  } = req.body

  try {
    user = await User.findById(id)
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  user.firstName = firstName
  user.lastName = lastName
  user.teleNo = teleNo
  user.email = email

  try {
    await user.save()
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    user: user.toObject({
      getters: true
    })
  })

  res.json({
    message: "Stock manager updated successfully!",
    user: user.toObject({
      getters: true
    })
  })
}

const deleteStoreManager = async (req, res, next) => {
  let user

  const {
    id
  } = req.body

  try {
    user = await User.findById(id)
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  try {
    await user.remove()
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    category: user.toObject({
      getters: true
    })
  })

  res.json({
    message: "Stock manager deleted successfully!",
    category: user.toObject({
      getters: true
    })
  })
}

const getStoreManager = async (req, res, next) => {

}

const getStoreManagerList = async (req, res, next) => {

}

const sendEmail = {
  //
}

exports.addStoreManager = addStoreManager
exports.updateStoreManager = updateStoreManager
exports.deleteStoreManager = deleteStoreManager
exports.getStoreManager = getStoreManager
exports.getStoreManagerList = getStoreManagerList
