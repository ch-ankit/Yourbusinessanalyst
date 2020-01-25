const Signup = require('./../models/signupModel');
exports.gsnpage = (req, res) => {
  res.sendfile('signup.html');
};

exports.adduser = async (req, res) => {
  try {
    await Signup.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      pannumber: req.body.pannumber,
      password: req.body.password,
      capital: req.body.capital
    });

    res.redirect('/login.html');
  } catch (err) {
    res.end(`ERRORs : ${err}`);
  }
};
