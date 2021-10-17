const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Kitchen 'updateOrder'
// array in Kitchen.js
const jobSchema = new Schema(
{
    lastupdated: {type: Date},
    orderId: {type: Schema.Types.ObjectId,
            ref: 'Order'}, // linked to orders,linked referen
    priority: {type: Number}, // ordercreatedAt time stamp in milliseconds
    status: {type:String},  // prelim, active, in-oven, cancel, complete
    quantity: {type: Number},
    commitTime: {type:Date}
  }
);

module.exports = jobSchema;