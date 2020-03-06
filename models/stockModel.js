const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
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
    type: Number,
    required: true
  },
  Sellingprice: {
    type: Number,
    default: 1
  },
  Date: {
    type: Number
  },
  supplierPan: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: 'defaultStock.jpeg'
  }
});

const Stocks = mongoose.model('Stocks', stocksSchema);
module.exports = Stocks;
