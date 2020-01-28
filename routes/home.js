const router = require('express').Router();
const homeController = require('./../controller/homeController');
const auth = require('../helpers/auth');

router.route('/').get(auth, homeController.ghmpage);

module.exports = router;
