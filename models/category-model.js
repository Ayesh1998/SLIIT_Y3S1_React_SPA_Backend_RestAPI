const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  categoryTitle: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  categoryDescription: {
    type: String,
    required: true,
    trim: true
  },
  categoryImage: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: 'Categories'
})

categorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Categories', categorySchema)
