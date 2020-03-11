const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  quantitySold: {
    type: Number,
    default: 0
  },
  userId: {
    type: String
  },
  modelNo: {
    type: String
  },
  Date: {
    type: Number,
    default: new Date().getFullYear() + new Date().getMonth()
  },
  quantityBought: {
    type: Number,
    default: 0
  },
  label: {
    type: Date,
    default: Date.now()
  }
});

const modelModel = mongoose.model('modelModel', modelSchema);
module.exports = modelModel;
