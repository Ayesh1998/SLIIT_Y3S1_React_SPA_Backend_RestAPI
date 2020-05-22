const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const productCommentSchema = new Schema({
  product_id: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_firstName: {
    type: String,
    required: true
  },
  user_lastName: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'ProductComments'
})

productCommentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('ProductComments', productCommentSchema)
