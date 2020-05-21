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
    teleNo
  } = req.body

  try {
    existingUser = await User.findOne({
      email: email
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingUser)
    return next(new HttpError('A user with the same email already exists.', 409))

  let generatedPassword = generatePassword()

  const newStoreManager = new User({
    firstName,
    lastName,
    teleNo,
    email,
    password: generatedPassword,
    type: 'Store Manager'
  })

  try {
    await newStoreManager.save()
    res.status(201).send({
      message: 'New store manager added successfully!'
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  sendEmail(email, generatedPassword)
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
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  storeManager.firstName = firstName
  storeManager.lastName = lastName
  storeManager.teleNo = teleNo
  storeManager.email = email

  try {
    await storeManager.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Stock manager updated successfully!'
  })
}

const deleteStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.params

  try {
    storeManager = await User.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    await storeManager.remove()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Stock manager deleted successfully!'
  })
}

const getStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.params

  try {
    storeManager = await User.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(storeManager)
}

const getStoreManagerList = async (req, res, next) => {
  let storeManagerList

  try {
    storeManagerList = await User.find({
      type: 'Store Manager'
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(storeManagerList)
}

function getAdminEmail() {
  let admin

  try {
    admin = User.findOne({
      type: 'Administrator'
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
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

  transporter.sendMail(info, (error, data) => {
    if (error)
      console.log(error)
    else
      console.log('Email sent successfully.')
  })
}

function generatePassword() {
  let length = 5
  let randomPassword = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length

  for (let i = 0; i < length; i++)
    randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength))

  return randomPassword
}

exports.addStoreManager = addStoreManager
exports.updateStoreManager = updateStoreManager
exports.deleteStoreManager = deleteStoreManager
exports.getStoreManager = getStoreManager
exports.getStoreManagerList = getStoreManagerList
