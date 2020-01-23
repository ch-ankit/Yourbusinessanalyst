const router = require('express').Router();
const partyController = require('./../controller/partyController');

router.route('/').get(partyController.gpage);

module.exports = router;
