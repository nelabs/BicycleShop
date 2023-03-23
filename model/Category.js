const mongoose = require('mongoose');
const validator = require('validator');


const categorySchema = new mongoose.Schema({
  category: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
