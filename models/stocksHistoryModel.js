const mongoose = require('mongoose');

const stocksHistorySchema = new mongoose.Schema({
  Modelno: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  Quantity: {
    type: Number,
    required: true,
    default: 0
  },
  soldQuantity: {
    type: Number,
    default: 0
  },
  Costprice: {
    type: Number
  },
  Sellingprice: {
    type: Number,
    default: 1
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
  }
});

const stocksHistoryModel = mongoose.model(
  'stocksHistoryModel',
  stocksHistorySchema
);
module.exports = stocksHistoryModel;
