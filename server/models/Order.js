const { time } = require('console');
const { Schema, model } = require('mongoose');
const pizzaorderSchema = require('./PizzaOrder');

const orderSchema = new Schema(
  {
    date: {
    type: Date,
    default: Date.now,
    required: true
  },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      required: true,
      trim: true
    },
    
    pizzaorder:  [pizzaorderSchema],
    
    requestTime:{
      type: Date,
      required: false
    }, 
    // this will come from the kitchen
    commitTime:{
      type: Date,
      required: true
    }
  },
  {timestamps : true}
);

const Order = model('Order', orderSchema);

module.exports = Order;
