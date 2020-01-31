const router = require('express').Router();
const userController = require('./../controller/usercontroller');

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
