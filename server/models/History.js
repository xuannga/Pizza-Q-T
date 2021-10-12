const { Schema, model } = require('mongoose');

const historySchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    // From orders or kitchen
    pizzaSold: {
      type: Number,
      required: true
    },
    // From kitchen
    ontimeOrders: {
      type: Number,
      required: true
    },
  // Coming from orders
    revenue: {
      type: Number,
      required: true
    }
  }
);

const History = model('History', historySchema);

module.exports = History;
