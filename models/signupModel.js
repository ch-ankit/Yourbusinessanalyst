const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
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
    required: true,
    unique: true
  },
  pannumber: {
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
  }
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
