const { Schema, model } = require('mongoose');

const kitchenSchema = new Schema(
  {
    date: {
      // day resolution not hour
      type: Date,
      default: Date.now,
      required: true
    },
    // queue ordernumber, timestamp entry, status
    queue: [{
      orderId: {type: Number}, // linked to orders
      priority: {type: Number},
      status: {type:String}  // prelim, active, in-oven, cancel, complete
    }],

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
