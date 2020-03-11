const router = require('express').Router();
const supplierController = require('./../controller/suppliersController');
const auth = require('./../helpers/auth');
router
  .route('/')
  .get(auth, supplierController.getSuppliers)
  .post(
    auth,
    supplierController.updateSupplierPhoto,
    supplierController.resizeSupplierPhoto,
    supplierController.addSuppliers
  );
module.exports = router;
