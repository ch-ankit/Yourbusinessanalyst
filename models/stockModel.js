const mongoose = require('mongoose');
const Users = require('./userModel');
const stocksSchema = new mongoose.Schema({
  Modelno: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    ref: 'User'
  },
  Quantity: {
    type: String,
    required: true,
    default: 0
  },
  Costprice: {
    type: String,
    required: true
  },
  Sellingprice: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});
const Stocks = mongoose.model('Stocks', stocksSchema);
module.exports = Stocks;
