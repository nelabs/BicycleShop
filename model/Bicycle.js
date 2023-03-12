const mongoose = require('mongoose');
const validator = require('validator');

//TODO: add data validation
//npm i validator

const bicycleSchema = new mongoose.Schema( {
  id: {
    type: Number,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    require: true,
    validate: {
      validator: function(value) {
        return validator.isAlpha(value);
      },
      message: 'Name can only contain letters'
    }
  },
  description: {
    type: String
  },
  star: {
    type: Number,
    validate(value) {
      if ((value) > 5) {
        throw new Error(`Star can't be more than 5`)
      }
    }
  },
  price: {
    type: Number
  },
  discount_percentage: {
    type: Number,
    default: 0,
    validate(value) {
      if ((value) > 100) {
        throw new Error(`Discount can't be more than 100%`)
      }
    }
  },
  image: { 
    type: String,
  }
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

module.exports = Bicycle;

