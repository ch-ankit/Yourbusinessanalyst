const router = require('express').Router();
const mongoose = require('mongoose');
const userController = require('./../controller/usercontroller');

const Stocks = require('./../models/stockModel');

const User = require('./../models/User');
//For Login
router
  .route('/login')
  .get(userController.getLogin)
  .post(userController.postLogin);

//signup
router
  .route('/signup')
  .get(userController.getSignup)
  .post(userController.adduser);

//logout

router.route('/logout').get(userController.logout);

module.exports = router;
