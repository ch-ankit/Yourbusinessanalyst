const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  supplierPan: {
    type: String,
    required: true
  },
  modelNo: {
    type: String
  },
  quantity: {
    type: Number
  },
  costPrice: {
    type: Number
  }
});

const supplier = mongoose.model('supplier', supplierSchema);
module.exports = supplier;
