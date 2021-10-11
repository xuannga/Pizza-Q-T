const { Schema, model } = require('mongoose');

const historySchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    pizzaSold: {
      type: Number,
      required: true
    },
    // Unused capacity ... how many more pizza could you make
    ontimeOrders: {
      type: Number,
      required: true
    },
    revenue: {
      type: Number,
      required: true
    }
  }
);

const History = model('History', historySchema);

module.exports = History;
