const router = require('express').Router();
const partyController = require('./../controller/partyController');
const auth = require('./../helpers/auth');

router.route('/').get(auth, partyController.gpage)
router.route('/paymentMade').post(auth, partyController.paymentMade);
router.route('/paymentReceived').post(auth, partyController.paymentReceived);

module.exports = router;
