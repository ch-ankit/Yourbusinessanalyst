const router = require('express').Router();
const auth = require('./../helpers/auth');
const paymentHistoryController = require('./../controller/paymentHistoryController');
router.route('/').get(auth, paymentHistoryController.gpage);
module.exports = router;
