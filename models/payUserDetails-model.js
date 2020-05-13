const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const payUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  isSave: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  collection: 'PayUserDetails'
})

payUserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('PayUserDetails', payUserSchema)
