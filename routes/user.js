const router = require('express').Router();
const userController = require('./../controller/usercontroller');
//For Login
router
  .route('/')
  .get(userController.login)
  .post(userController.Login);

module.exports = router;
