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
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  await sendEmail(email, generatedPassword)

  res.status(201).send({
    message: 'New store manager added successfully!'
  })
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

const getAdminEmail = async () => {
  let admin

  try {
    admin = await User.findOne({
      type: 'Administrator'
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  return await admin.email
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tharindarajapakshe@gmail.com',
    pass: process.env.PASSWORD
  }
})

const sendEmail = async (email, password) => {
  let adminEmail = getAdminEmail()

  let info = {
    from: adminEmail,
    to: email,
    subject: 'Added as a Store Manager',
    text:
      `Congratulations!
      You have been assigned as a Store Manager.
      Now you can manage product related operations as a store manager in the Online Fashion Store.
      Please find your login credentials below.
      LOGIN CREDENTIALS
      Email: ${email}
      Password: ${password}
      Thank you!
      This is an auto-generated email.
      If this has been sent by mistake, please delete this without sharing this.
      All rights reserved.`,
    html:
      `<div style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: arial, serif;">
      <table style="margin: 0 auto; background: white; max-width: 500px; padding-bottom: 0; border-top: 5px solid #588dde; border-bottom: 5px solid #588dde; width: 100%;">
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>
      <table align="left" style="width: 100%;">
      <tr>
      <td style="padding: 10px;">
      <h1 style="text-align: center; color: #1a1a72;">Congratulations!</h1>
      <h2 style="margin-top:25px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">You have been assigned as a Store Manager.</h2>
      <h2 style="margin-top:20px; margin-bottom: 0; color: #4db0c4; font-weight: 400; font-size: medium;">Now you can manage product related operations as a store manager in the Online Fashion Store.</h2>
      <h2 style="margin-top:20px; margin-bottom: 10px; color: #4db0c4; font-weight: 400; font-size: medium;">Please find your login credentials below.</h2>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>
      <table align="left" style="width: 100%;">
      <tr>
      <td style="padding: 10px;">
      <h4 style="margin-top:20px; margin-bottom: 8px; color: #145a7a; font-weight: 400; text-align: center; font-size: 16px;"><b>LOGIN CREDENTIALS</b></h4>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>
      <table align="left" style="width: 50%;">
      <tr>
      <td align="left" valign="top" style="padding: 10px;">
      <h6 style="font-size: 14px; margin-top: 0; margin-bottom: 0; color: #29353c; font-weight: 400;">E-mail</h6>
      <h6 style="font-size: 14px; margin-top: 20px; margin-bottom: 0; color: #29353c; font-weight: 400;">Password</h6>
      </td>
      </tr>
      </table>
      <table align="left" style="width: 50%;">
      <tr>
      <td align="right" valign="top" style="padding: 10px;">
      <h6 style="font-size: 14px; margin-top: 0; margin-bottom: 0; color: #588dde; font-weight: 400;">${email}</h6>
      <h6 style="font-size: 14px; margin-top: 20px; margin-bottom: 0; color: #588dde; font-weight: 400;">${password}</h6>
      </td>
      </tr>
      </table>
      </td>
      </tr>
      <tr style="background: rgb(237, 243, 255); padding-left: 20px; padding-right: 20px;">
      <td>`
  }

  transporter.sendMail(info, (error, data) => {
    if (error) {
      console.log(error)
      console.log('Email sending failed! Please try again.')
    } else {
      console.log(data)
      console.log('An email is sent successfully to ' + email + '.')
    }
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
