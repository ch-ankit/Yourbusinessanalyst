const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  buyerPan: {
    type: String,
    required: true
  },
  modelNo: {
    type: String
  },
  quantity: {
    type: Number
  },
  sellingPrice: {
    type: Number
  }
});

const buyer = mongoose.model('buyer', buyerSchema);
module.exports = buyer;
