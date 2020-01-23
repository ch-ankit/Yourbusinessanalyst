const router = require('express').Router();
const accountController = require('./../controller/accountController');

router.route('/').get(accountController.gacpage);

module.exports = router;
