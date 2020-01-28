const router = require('express').Router();
const aboutusController = require('./../controller/aboutusController');
const auth = require('./../helpers/auth');

router.route('/').get(auth, aboutusController.gpage);

module.exports = router;
