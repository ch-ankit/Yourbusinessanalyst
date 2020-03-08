const router = require('express').Router();
const supplierController = require('./../controller/suppliersController');
const auth = require('./../helpers/auth');
router
  .route('/')
  .get(auth, supplierController.getSuppliers)
  .post(auth, supplierController.updateSupplierPhoto,
    supplierController.resizeSupplierPhoto, supplierController.addSuppliers);

router.route('/getSupplies').get(auth, supplierController.getSupplies);

module.exports = router;
