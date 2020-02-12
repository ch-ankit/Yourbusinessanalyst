const router = require('express').Router();
const auth = require('./../helpers/auth');
const historyController = require('./../controller/historyController');
router.route('/').get(auth, historyController.gpage);
module.exports = router;
