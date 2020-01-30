const moment = require('moment');
const Stocks = require('./../models/stockModel');

const User = require('./../models/User');

exports.gpage = async (req, res, next) => {
  const user = await User.findOne({ id: req.user.id });
  Stocks.find(
    { userId: req.user.id },
    'Modelno Quantity Sellingprice Costprice -_id',
    (err, docs) => {
      if (!err) {
        res.render('stocks', {
          title: 'Stocks',
          admin: user.username,
          accessTime: moment().format(),
          stocks: docs,
          src: './../images/smiley.jpg'
        });
      } else {
        next(err);
      }
    }
  );
};
exports.addStocks = async (req, res, next) => {
  try {
    await Stocks.create({
      Modelno: req.body.Modelno,
      Sellingprice: req.body.Sellingprice,
      Costprice: req.body.Costprice,
      Quantity: req.body.Quantity,
      userId: req.user.id
    });
    res.redirect('/stocks');
  } catch (err) {
    next(err);
  }
};


exports.updateQuantity = async (req, res) => {
  try {
    const q = await Stocks.findOne(
      {
        Modelno: req.body.Modelno,
        userId: req.user.id
      })
    const docs = await Stocks.findOneAndUpdate({
      Modelno: req.body.Modelno,
      userId: req.user.id
    }, {
      Quantity: (q.Quantity - req.body.Quantity) < 0 ? 0 : q.Quantity - req.body.Quantity
    });
    res.redirect('/home');
  } catch (err) {
    res.send(`Error:${err}`);
  }
};