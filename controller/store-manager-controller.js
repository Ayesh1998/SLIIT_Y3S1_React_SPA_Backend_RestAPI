const nodemailer = require('nodemailer')

const HttpError = require('../models/http-errors')
const User = require('../models/users-model')

require('dotenv').config()

const addStoreManager = async (req, res, next) => {
  let existingUser

  const {
    firstName,
    lastName,
    email,
    teleNo,
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

  const newStoreManager = new User({
    firstName,
    lastName,
    teleNo,
    email,
    password,
    type: 'Store Manager'
  })

  try {
    await newStoreManager.save()
    res.json({
      message: 'New store manager added!'
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(201).json({
    newStoreManager: newStoreManager.toObject({
      getters: true
    })
  })

  res.json({
    message: 'New store manager added successfully!',
    newStoreManager: newStoreManager.toObject({
      getters: true
    })
  })

  sendEmail(email, password)
}

const updateStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.params

  const {
    firstName,
    lastName,
    teleNo,
    email
  } = req.body

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  storeManager.firstName = firstName
  storeManager.lastName = lastName
  storeManager.teleNo = teleNo
  storeManager.email = email

  try {
    await storeManager.save()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    user: storeManager.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Stock manager updated successfully!',
    user: storeManager.toObject({
      getters: true
    })
  })
}

const deleteStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.params

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  try {
    await storeManager.remove()
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json({
    storeManager: storeManager.toObject({
      getters: true
    })
  })

  res.json({
    message: 'Stock manager deleted successfully!',
    storeManager: storeManager.toObject({
      getters: true
    })
  })
}

const getStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.params

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.status(200).json(storeManager)
}

const getStoreManagerList = async (req, res, next) => {
  let storeManagerList

  try {
    storeManagerList = await User.find({
      type: 'Store Manager'
    })
  } catch (err) {
    const error = new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    res.json({
      message: 'Unexpected internal server error occurred, please try again later.'
    })
    return next(error)
  }

  res.send(storeManagerList)
}

function getAdminEmail() {
  let admin

  try {
    admin = User.find({
      type: 'Administrator'
    })
  } catch (err) {
    return next(
      new HttpError('Unexpected internal server error occurred, please try again later.', 500)
    )
  }

  return admin.email
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: getAdminEmail(),
    password: process.env.PASSWORD
  }
})

function sendEmail(email, password) {
  let info = {
    from: getAdminEmail(),
    to: email,
    subject: 'Added as a Store Manager',
    text:
      'You have been assigned as a Store Manager. ' +
      'Email: ' +
      email +
      'Password: ' +
      password +
      'Thank you!'
  }

  transporter.sendMail(info, (err, data) => {
    if (err)
      console.log(err)
    else
      console.log('Email sent successfully.')
  })
}

exports.addStoreManager = addStoreManager
exports.updateStoreManager = updateStoreManager
exports.deleteStoreManager = deleteStoreManager
exports.getStoreManager = getStoreManager
exports.getStoreManagerList = getStoreManagerList
