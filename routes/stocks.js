const router = require('express').Router();
const stocksController = require('./../controller/stocksController');

const auth = require('./../helpers/auth');

router
  .route('/')
  .get(auth, stocksController.gpage)
  .post(auth, stocksController.addStocks);

router.route('/updateQuantity').post(auth, stocksController.updateQuantity);

router.route('/getStocks').get(auth, stocksController.getStocks)


module.exports = router;
