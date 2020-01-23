const router = require('express').Router();
const helpController = require('./../controller/helpController');

router.route('/').get(helpController.gpage);

module.exports = router;
