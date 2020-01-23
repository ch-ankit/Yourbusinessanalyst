const router = require('express').Router();
const stocksController = require('./../controller/stocksController');

router
  .route('/')
  .get(stocksController.gpage)
  .post(stocksController.addStocks);

module.exports = router;
