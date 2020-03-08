const router = require('express').Router();
const clientandsupplierController = require('./../controller/clientandsupplierController');
const auth = require('./../helpers/auth');
router.route('/').get(auth, clientandsupplierController.gpage);

module.exports = router;
