const mongoose = require('mongoose');

const supplierBuyersSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
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
exports.supplierDetails = mongoose.model(
  'supplierDetail',
  supplierBuyersSchema
);
