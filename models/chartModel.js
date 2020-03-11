const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  stockValue: {
    type: Number,
    default: 0
  },
  userId: {
    type: String
  },
  Date: {
    type: Number,
    default:
      new Date().getFullYear() + new Date().getMonth() + new Date().getDate()
  },
  estimatedProfit: {
    type: Number,
    default: 0
  },
  actualProfit: {
    type: Number,
    default: 0
  }
});

const chartModel = mongoose.model('chartModel', chartSchema);
module.exports = chartModel;
