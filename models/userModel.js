const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  mobilenumber: {
    type: String
  },
  capital: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'default.jpeg'
  },
  dateCreated: {
    type: String,
    default: Date.now()
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
