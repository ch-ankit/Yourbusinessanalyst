const router = require('express').Router();
const homeController = require('./../controller/homeController');

router.route('/').get(homeController.ghmpage);

module.exports = router;
