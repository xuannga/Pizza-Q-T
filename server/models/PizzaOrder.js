const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const pizzaorderSchema = new Schema({
  
  quantity: {
    type: Number,
    default:1,
    required: true,
  },
  //  
  size: {
    type: String,
    trim: true,
    required: true
  },
  toppings: {
    type: String,
    trim: true,
    required: true
  },
  crust: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports= pizzaorderSchema;