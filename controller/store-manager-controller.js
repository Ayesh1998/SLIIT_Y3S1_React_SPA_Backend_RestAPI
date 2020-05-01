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
  let storeManager

  const {
    id,
    firstName,
    lastName,
    teleNo,
    email
  } = req.body

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
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
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    user: storeManager.toObject({
      getters: true
    })
  })

  res.json({
    message: "Stock manager updated successfully!",
    user: storeManager.toObject({
      getters: true
    })
  })
}

const deleteStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.body

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  try {
    await storeManager.remove()
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    category: storeManager.toObject({
      getters: true
    })
  })

  res.json({
    message: "Stock manager deleted successfully!",
    category: storeManager.toObject({
      getters: true
    })
  })
}

const getStoreManager = async (req, res, next) => {
  let storeManager

  const {
    id
  } = req.body

  try {
    storeManager = await User.findById(id)
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    category: storeManager.toObject({
      getters: true
    })
  })

  res.json({
    message: "Store manager retrieved successfully!",
    category: storeManager.toObject({
      getters: true
    })
  })

  res.send(storeManager)
}

const getStoreManagerList = async (req, res, next) => {
  let storeManagerList

  try {
    storeManagerList = await User.find({
      type: 'Store Manager'
    })
  } catch (err) {
    const error = new httpError("Unexpected internal server error occurred, please try again later.", 500)
    res.json({
      message: "Unexpected internal server error occurred, please try again later."
    })
    return next(error)
  }

  res.status(200).json({
    category: storeManagerList.toObject({
      getters: true
    })
  })

  res.json({
    message: "Store manager list retrieved successfully!",
    category: storeManagerList.toObject({
      getters: true
    })
  })

  res.send(storeManagerList)
}

// const sendEmail = () => {
//   let info = {
//     from: 'it18149654@my.sliit.lk',
//     to: '',
//     subject: 'Added as a Store Manager',
//     text: ''
//   }
//   transporter.sendMail(info, (err, data) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log("sent")
//     }
//   })
// }

exports.addStoreManager = addStoreManager
exports.updateStoreManager = updateStoreManager
exports.deleteStoreManager = deleteStoreManager
exports.getStoreManager = getStoreManager
exports.getStoreManagerList = getStoreManagerList
