const moment = require('moment');
const Stocks = require('./../models/stockModel');

const User = require('./../models/userModel');
const { Supplier, Buyer } = require('./../models/buyerSupplierModel');

exports.gpage = async (req, res, next) => {
  const user = await User.findOne({ id: req.user.id });
  Stocks.find(
    { userId: req.user.id },
    'Modelno Quantity Sellingprice Costprice supplierPan -_id',
    (err, docs) => {
      if (!err) {
        res.render('stocks', {
          title: 'Stocks',
          admin: user.username,
          accessTime: moment().format(),
          stocks: docs,
          modelNo: Object.keys(docs).map(el => docs[el].Modelno),
          quantity: Object.keys(docs).map(el => docs[el].Quantity),
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
    let stock = await Stocks.findOneAndUpdate(
      {
        Modelno: req.body.Modelno,
        userId: req.user.id,
        supplierPan: req.body.supplierPannumber
      },
      {
        $inc: {
          Quantity: parseInt(req.body.Quantity)
        },
        Costprice: parseInt(req.body.Costprice),
        Sellingprice: parseInt(req.body.Sellingprice),
        supplierPan: req.body.supplierPannumber,
        Modelno: req.body.Modelno,
        userId: req.user.id,
        Date: Date.now()
      },
      { upsert: true, new: true }
    );

    let supplier = await Supplier.findOne({
      userId: req.user.id,
      supplierPan: req.body.supplierPannumber
    });
    if (!supplier) {
      supplier = await Supplier.create({
        userId: req.user.id,
        supplierPan: req.body.supplierPannumber,
        $push: {
          supplies: stock
        }
      });
    }
    else {
      let exist = supplier.supplies.includes(stock._id) || false;
      if (!exist) {
        supplier = await Supplier.updateOne(supplier, {
          userId: req.user.id,
          supplierPan: req.body.supplierPannumber,
          $push: {
            supplies: stock
          }
        });
      }
    }
    let supplies = await Supplier.findOne({ userId: req.user.id }).populate(
      'supplies'
    );
    console.log(supplies.supplies)
    // res.json(supplies.supplies);
    res.redirect('/stocks');
    // }
  } catch (err) {
    next(err);
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const q = await Stocks.findOne({
      Modelno: req.body.Modelno,
      userId: req.user.id
    });
    const docs = await Stocks.findOneAndUpdate(
      {
        Modelno: req.body.Modelno,
        userId: req.user.id
      },
      {
        Quantity:
          q.Quantity - req.body.Quantity < 0
            ? 0
            : q.Quantity - req.body.Quantity
      }
    );
    await Buyer.findOneAndUpdate({ userId: req.user.id, supplierPan: req.body.buyerPannumber }, {
      $inc: {
        Quantity: parseInt(req.body.Quantity)
      },
      Costprice: parseInt(req.body.Costprice),
      Sellingprice: parseInt(req.body.Sellingprice),
      supplierPan: req.body.buyerPannumber,
      Modelno: req.body.Modelno,
      userId: req.user.id,
      Date: Date.now()
    },
      { upsert: true, new: true });
    res.redirect('/home');
  } catch (err) {
    res.send(`Error:${err}`);
  }
};
