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
  Stocks.find(
    {},
    'Modelno Quantity Sellingprice Costprice -_id',
    (err, docs) => {
      if (!err) {
        res.render('stocks', {
          title: 'Stocks',
          admin: global.compUser[0].username,
          accessTime: moment().format(),
          stocks: docs,
          src: './../images/smiley.jpg'
        });
      } else {
        res.send(err);
      }
    }
  );
};
exports.addStocks = async (req, res) => {
  try {
    await Stocks.create(req.body);
    res.redirect('/stocks');
  } catch (err) {
    res.send(`Error:${err}`);
  }
};
