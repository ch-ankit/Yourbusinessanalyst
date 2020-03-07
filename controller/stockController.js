const moment = require('moment');
const Stocks = require('./../models/stockModel');
const User = require('./../models/userModel');

let date =
  new Date().getFullYear() + new Date().getMonth() + new Date().getDate();

exports.gpage = async (req, res, next) => {
  const user = await User.findOne({ id: req.user.id });
  await Stocks.find(
    { userId: req.user.id, Modelno: req.query.name },
    'Modelno Quantity Sellingprice Costprice supplierPan photo Date -_id',
    (err, docs) => {
      if (!err) {
        res.render('stock', {
          title: req.query.name,
          admin: user.username,
          accessTime: moment().format(),
          stocks: docs,
          modelNo: Object.keys(docs).map(el => docs[el].Modelno),
          quantity: Object.keys(docs).map(el => docs[el].Quantity),
          src: `./../images/users/${user.photo}`,
          src1: `./../images/stocks/${docs[0].photo}`
        });
      } else {
        next(err);
      }
    }
  );
};
