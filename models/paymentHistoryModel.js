const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  userId: {
    type: String
  },
  amount: {
    type: Number
  },
  Date: {
    type: Date,
    default: Date.now()
  },
  pan: {
    type: String,
    default: ''
  },
  method: {
    type: Number
  },
  name: {
    type: String
  }
});

const paymentHistoryModel = mongoose.model(
  'paymentHistoryModel',
  paymentHistorySchema
);
module.exports = paymentHistoryModel;
