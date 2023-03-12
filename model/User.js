const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    message: "Not a valid username"
  },
  email: {
    type: String,
    require: true,
    validate: function(value) {
      return validator.isEmail(value); 
    },
    message: "Not a valid email"
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  }
});

userSchema.pre('save', async function(next) {
  console.log('before saving');
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  //ismodified
  next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;



