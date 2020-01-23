const Signup = require('./../models/signupModel');
exports.gsnpage = (req, res) => {
  res.sendfile('signup.html');
};

exports.adduser = async (req, res) => {
  try {
    await Signup.create(req.body);
    res.redirect('/login.html');
  } catch (err) {
    res.end(`ERROR : ${err}`);
  }
};
