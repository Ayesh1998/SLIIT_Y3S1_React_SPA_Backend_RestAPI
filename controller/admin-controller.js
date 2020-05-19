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
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError('A user with the same email already exists.', 409)
    res.json({
      message: 'A user with the same email already exists.'
    })
    return next(error)
  }

  const newAdmin = new User({
    email,
    password,
    type: 'Administrator'
  })

  try {
    await newAdmin.save()
    res.json({
      message: 'New administrator added!'
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(201).json({
    newAdmin: newAdmin.toObject({
      getters: true
    })
  })

  res.json({
    message: 'New administrator added successfully!',
    newAdmin: newAdmin.toObject({
      getters: true
    })
  })
}

const updateAdmin = async (req, res, next) => {
  let admin

  const {
    id
  } = req.params

  const {
    email,
    password
  } = req.body

  try {
    admin = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  admin.email = email
  admin.password = password

  try {
    await admin.save()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    user: admin.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Administrator updated successfully!',
    user: admin.toObject({
      getters: true
    })
  })
}

const deleteAdmin = async (req, res, next) => {
  let admin

  const {
    id
  } = req.params

  try {
    admin = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  try {
    await admin.remove()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    admin: admin.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Administrator deleted successfully!',
    admin: admin.toObject({
      getters: true
    })
  })
}

const getAdmin = async (req, res, next) => {
  let admin

  const {
    id
  } = req.params

  try {
    admin = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json(admin)
}

const getAdminList = async (req, res, next) => {
  let adminList

  try {
    adminList = await User.find({
      type: 'Administrator'
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.send(adminList)
}

exports.addAdmin = addAdmin
exports.updateAdmin = updateAdmin
exports.deleteAdmin = deleteAdmin
exports.getAdmin = getAdmin
exports.getAdminList = getAdminList
