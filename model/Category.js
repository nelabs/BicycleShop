const mongoose = require('mongoose');
const validator = require('validator');


const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bicycle'
  }]
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
