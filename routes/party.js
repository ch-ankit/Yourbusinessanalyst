const router = require('express').Router();
const partyController = require('./../controller/partyController');
const auth = require('./../helpers/auth');

router.route('/').get(auth, partyController.gpage);

module.exports = router;
