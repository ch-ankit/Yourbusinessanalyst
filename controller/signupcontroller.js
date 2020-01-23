const Signup = require('./../models/signupModel');
exports.gsnpage = (req, res) => {
  res.sendfile('signup.html');
};

exports.adduser = async (req, res) => {
  try {
    await Signup.create(req.body);
    console.log(newTour);
    res.redirect('/login.html');
  } catch (err) {
    console.log(err);
    res.end('ERROR CODE');
  }
};
