const mongoose = require('mongoose');

const supplierBuyersSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  amount: {
    type: String,
    default: 0
  },
  pan: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

exports.buyerDetails = mongoose.model('buyerDetails', supplierBuyersSchema);
exports.supplierDetail = mongoose.model('supplierDetail', supplierBuyersSchema);
