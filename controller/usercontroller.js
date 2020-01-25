const Signup = require('./../models/signupModel');
const Users = require('./../models/userModel');
exports.login = (req, res) => {
  res.sendFile('login.html');
};

exports.Login = async (req, res) => {
  try {
    const rem = { username: req.body.username, password: req.body.password };
    global.compUser = await Signup.find(rem);
    console.log(compUser);
    if (compUser == undefined) throw new Error('username password not found');
    if (
      req.body.username == compUser[0].username &&
      req.body.password == compUser[0].password
    ) {
      res.redirect('/home');
    }
  } catch (err) {
    res
      .status(400)
      .send(
        '<h1><center>AUTHENTICATION FAILED!!!</center></h1> <a href="login.html">Go To Login Page </a>'
      );
  }
};
