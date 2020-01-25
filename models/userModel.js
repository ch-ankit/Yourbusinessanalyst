const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
