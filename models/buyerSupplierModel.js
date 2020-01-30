const mongoose = require('mongoose');
const Users = require('./userModel');

const buyerSupplierSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User'
  },
  panNo: {
    type: String,
    required: true
  },
  Fields: {
    modelNo: {
      type: [String],
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }
});

const Buyer = mongoose.model('Buyer', buyerSupplierSchema);
const Supplier = mongoose.model('Supplier', buyerSupplierSchema);
module.exports = Buyer;
