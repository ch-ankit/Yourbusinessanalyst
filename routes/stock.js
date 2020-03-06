const router = require('express').Router();
const stockController = require('./../controller/stockController');

const auth = require('./../helpers/auth');

router.route('/').get(auth, stockController.gpage);

module.exports = router;
