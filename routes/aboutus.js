const router = require('express').Router();
const aboutusController = require('./../controller/aboutusController');

router.route('/').get(aboutusController.gpage);

module.exports = router;
