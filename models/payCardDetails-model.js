const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const payCardSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  cardType: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  }, isSave: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  collection: 'PayCardDetails'
})

payCardSchema.plugin(uniqueValidator)

module.exports = mongoose.model('PayCardDetails', payCardSchema)
