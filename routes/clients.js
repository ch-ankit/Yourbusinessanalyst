const router = require('express').Router();
const clientsController = require('./../controller/clientsController');
const auth = require('./../helpers/auth');
router
  .route('/')
  .get(auth, clientsController.getClients)
  .post(auth, clientsController.updateClientPhoto,
    clientsController.resizeClientPhoto, clientsController.addClients);

router.route('/getSupplies').get(auth, clientsController.getSupplies);

module.exports = router;
