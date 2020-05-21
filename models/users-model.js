const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  teleNo: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetQuestion: {
    type: String
  },
  answer: {
    type: String
  },
  type: {
    type: String,
    default: 'Customer'
  }
}, {
  timestamps: true,
  collection: 'Users'
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Users', userSchema)
