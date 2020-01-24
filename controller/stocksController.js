const moment = require('moment');
const Stocks = require('./../models/stockModel');
const Signup = require('./../models/signupModel');
// let stocks = Stocks.find(
//   {},
//   'Modelno Quantity Costprice Sellingprice ',
//   (err, stocker) => {
//     if (err) {
//       console.log('something went wrong');
//     } else {
//       //console.log(stocker);
//       return stocker;
//     }
//   }
// );

exports.gpage = (req, res) => {
  Stocks.find((err, docs) => {
    if (!err) {
      res.render('stocks', {
        title: 'Stocks',
        admin: 'user',
        accessTime: moment().format(),
        stocks: docs
      });
    } else {
      res.send(err);
    }
    console.log(docs);
  });
};
exports.addStocks = async (req, res) => {
  try {
    await Stocks.create(req.body);
    res.redirect('/stocks');
  } catch (err) {
    res.send(`Error:${err}`);
  }
};
