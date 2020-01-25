const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// signupSchema.pre('save', async next => {
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
