const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryTitle: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  categoryDescription: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Categories'
})

categorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Categories', categorySchema)
