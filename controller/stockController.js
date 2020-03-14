const moment = require('moment');
const Stocks = require('./../models/stockModel');
const User = require('./../models/userModel');
const Model = require('./../models/modelModel');

exports.gpage = async (req, res, next) => {
  const user = await User.findOne({ id: req.user.id });

  const docs = await Model.find(
    { userId: req.user.id, modelNo: req.query.name },
    '-_id -__v'
  );

  let quantitySold = [];
  let quantityBought = [];
  let label = [];

  quantitySold = Object.keys(docs).map(el => docs[el].quantitySold);
  quantityBought = Object.keys(docs).map(el => docs[el].quantityBought);
  let labels = Object.keys(docs).map(el => docs[el].label);
  label = labels.map(el => moment(el).format('YYYY MM'));
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
          src1: `./../images/stocks/${docs[0].photo}`,
          quantitySold: quantitySold,
          quantityBought: quantityBought,
          label: label
        });
      } else {
        next(err);
      }
    }
  );
};
