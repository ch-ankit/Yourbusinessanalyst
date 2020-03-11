const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    stockValue: {
        type: Number,
        default: 0
    },
    userId: {
        type: String
    },
    Date: {
        type: [Number],
        default:
            new Date().getFullYear() + new Date().getMonth() + new Date().getDate()
    },
    estimatedProfit: {
        type: Number,
        default: 0
    },
    depreciation: {
        type: Number,
        default: 0
    },
    actualProfit: {
        type: Number,
        default: 0
    }
});

const testModel = mongoose.model('testModel', testSchema);
module.exports = testModel;