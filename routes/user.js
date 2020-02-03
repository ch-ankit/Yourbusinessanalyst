const router = require('express').Router();
const userController = require('./../controller/usercontroller');
const auth = require('./../helpers/auth');


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

//Update the user details
router.route('/updateUser').patch(auth, userController.updateUserPhoto, userController.resizeUserPhoto, userController.updateMe)
//logout

router.route('/logout').get(userController.logout);

module.exports = router;
