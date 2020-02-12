const router = require('express').Router();
const auth = require('./../helpers/auth');
const stocksHistoryController = require('./../controller/stocksHistoryCotroller');
router.route('/').get(auth, stocksHistoryController.gpage);

module.exports = router;
