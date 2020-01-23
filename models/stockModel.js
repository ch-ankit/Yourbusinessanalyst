const mongoose = require('mongoose');
const stocksSchema = new mongoose.Schema({
  Modelno: {
    type: String,
    required: true,
    unique: true
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
