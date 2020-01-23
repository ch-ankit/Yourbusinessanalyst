const router = require('express').Router();
const signupController = require('./../controller/signupcontroller');

//signup
router
  .route('/')
  .get(signupController.gsnpage)
  .post(signupController.adduser);

module.exports = router;
