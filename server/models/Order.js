const mongoose = require('mongoose');


const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
requestTime:{
  type: Date,
  required: false
}, 
// this will come from the kitchen
commitTime:{
  type: Date,
  default: null
},
status:{
    type: String,
    required: true,
    default: "active",
    trim: true}
},
 
{timestamps : true}
);


module.exports = Order;