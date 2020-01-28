const router = require('express').Router();
const accountController = require('./../controller/accountController');
const auth = require('./../helpers/auth');

router.route('/').get(auth, accountController.gacpage);

module.exports = router;
