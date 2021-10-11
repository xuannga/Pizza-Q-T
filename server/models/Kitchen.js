const { Schema, model } = require('mongoose');

const kitchenSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    prelimqueue:[{Date,String}],
    pizzaqueue: [{Date,String}],
    // Could these two be redundant, add field of status/location
    pizzaintheoven: [{Date,String}],
    pizzacompleted:[{Date,String}],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ]
  }
);

const Kitchen = model('Kitchen', kitchenSchema);

module.exports = Kitchen;
