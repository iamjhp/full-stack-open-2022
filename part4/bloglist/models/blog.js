const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  author: String,
  url: { 
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog