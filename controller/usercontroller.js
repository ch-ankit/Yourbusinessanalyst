const User = require('./../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
//LOGIN

exports.getLogin = async (req, res, next) => {
  try {
    res.render('login');
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user.length == 0) res.send('USERNAME OR PASSWORD NOT CORRECT');
    let passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      res.send('USERNAME OR PASSWORD NOT CORRECT');
    }

    let token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.cookie('auth-token', token);
    res.redirect('/home');
  } catch (err) {
    next(err)
  }
};

//SIGNUP

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.adduser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  try {
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      id: req.body.pannumber,
      password: hash,
      capital: req.body.capital
    });

    res.redirect('/user/login');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('auth-token');
  res.redirect('/user/login');
};
