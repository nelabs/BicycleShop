const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  comment: {
    type: String
  },
  rating: {
    type: Number
  },
  bicycleid: {
    type: String
  }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

