const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
  Modelno: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String
  },
  Quantity: {
    type: Number,
    required: true,
    default: 0
  },
  Costprice: {
    type: Number,
    required: true
  },
  Sellingprice: {
    type: Number,
    default: 0
  },
  Date: {
    type: Date,
    default: Date.now()
  },
  supplierPan: {
    type: String,
    default: ''
  }
});

// stocksSchema.post("findOneAndUpdate", function (next) {

//   if (this.isModified("Quantity")) {

//   }

// })

const Stocks = mongoose.model('Stocks', stocksSchema);
module.exports = Stocks;
