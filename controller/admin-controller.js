const HttpError = require('../models/http-errors')
const User = require('../models/users-model')

const addAdmin = async (req, res, next) => {
  let existingUser

  const {
    email,
    password
  } = req.body

  try {
    existingUser = await User.findOne({
      email: email
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingUser) {
    res.json({
      exists: true,
      message: 'A user with the same email already exists.'
    })
    return next(new HttpError('A user with the same email already exists.', 409))
  }

  const newAdmin = new User({
    email,
    password,
    type: 'Administrator'
  })

  try {
    await newAdmin.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New administrator added successfully!'
  })
}

const updateAdmin = async (req, res, next) => {
  let admin
  let existingUser

  const {
    id
  } = req.params

  const {
    email,
    password
  } = req.body

  try {
    admin = await User.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingUser = await User.findOne({
      email: email
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingUser && email !== admin.email) {
    res.json({
      exists: true,
      message: 'A user with the same email already exists.'
    })
    return next(new HttpError('A user with the same email already exists.', 409))
  }


  admin.email = email
  admin.password = password

  try {
    await admin.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Administrator updated successfully!',
  })
}

const deleteAdmin = async (req, res, next) => {
  let admin

  const {
    id
  } = req.params

  try {
    admin = await User.findById(id)
    await admin.remove()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Administrator deleted successfully!',
  })
}

const getAdmin = async (req, res, next) => {
  let admin

  const {
    id
  } = req.params

  try {
    admin = await User.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(admin)
}

const getAdminList = async (req, res, next) => {
  let adminList

  try {
    adminList = await User.find({
      type: 'Administrator'
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(adminList)
}

exports.addAdmin = addAdmin
exports.updateAdmin = updateAdmin
exports.deleteAdmin = deleteAdmin
exports.getAdmin = getAdmin
exports.getAdminList = getAdminList
