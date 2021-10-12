const { time } = require('console');
const { Schema, model } = require('mongoose');

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
    
    pizzaorder:  {
      quantity: {type: Number, default: 1, require: true},
      size: { type: String, require: true, trim: true},
      toppings:{type:  String, require: true, trim: true},
      crust: {type: String, require: true, trim: true},
      price:{type:Number,require:true, trim:true}
      },
    
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
