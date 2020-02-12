const moment = require('moment');
const Stocks = require('./../models/stockModel');

const User = require('./../models/userModel');
const stocksHistoryModel = require('../models/stocksHistoryModel');
const { Supplier, Buyer } = require('./../models/buyerSupplierModel');
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');

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
          src: `./../images/users/${user.photo}`
        });
      } else {
        next(err);
      }
    }
  );
};
exports.addStocks = async (req, res, next) => {
  try {
    let valider = await supplierDetails.findOne({
      pan: req.body.supplierPannumber
    });
    if (!valider) {
      throw new Error('Supplier Is Not Registered, Add Suppliers first');
    } else {
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
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      await stocksHistoryModel.create({
        Quantity: parseInt(req.body.Quantity),
        Costprice: parseInt(req.body.Costprice),
        method: 0,
        pan: req.body.supplierPannumber,
        Modelno: req.body.Modelno,
        userId: req.user.id,
        Date: Date.now()
      });

      let supplier = await Supplier.findOne({
        userId: req.user.id,
        supplierPan: req.body.supplierPannumber
      });
      if (!supplier) {
        supplier = await Supplier.create({
          userId: req.user.id,
          supplierPan: req.body.supplierPannumber,
          supplies: stock
        });
      } else {
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
      await supplierDetails.updateOne(valider, {
        $inc: {
          amount: parseInt(req.body.Quantity) * parseInt(req.body.Costprice)
        }
      });
      res.redirect('/stocks');
    }
  } catch (err) {
    next(err);
  }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const validator = await buyerDetails.findOne({
      pan: req.body.buyerPannumber
    });
    if (!validator) {
      throw new Error(`Buyer Is Not Registered, Add Buyer's Detail first`);
    } else {
      const q = await Stocks.findOne({
        Modelno: req.body.Modelno,
        userId: req.user.id
      });
      if (q.Quantity < parseInt(req.body.Quantity)) {
        throw new Error('Selected Model Out of Stocks');
      } else {
        await stocksHistoryModel.create({
          soldQuantity: parseInt(req.body.Quantity),
          Sellingprice: parseInt(req.body.Sellingprice),
          method: 1,
          pan: req.body.buyerPannumber,
          Modelno: req.body.Modelno,
          userId: req.user.id,
          Date: Date.now()
        });
        let stock = await Stocks.findOneAndUpdate(
          {
            Modelno: req.body.Modelno,
            userId: req.user.id
          },
          {
            $set: {
              Quantity: q.Quantity - req.body.Quantity,
              soldQuantity: req.body.Quantity,
              Sellingprice: req.body.Sellingprice
            }
          },
          { new: true }
        );
        ////////////////////////////////////
        ////////////////////////////////////
        ////////////////////////////////////
        /////////////////////////////////////
        let buyer = await Buyer.findOne({
          userId: req.user.id,
          supplierPan: req.body.buyerPannumber
        });
        if (!buyer) {
          buyer = await Buyer.create({
            userId: req.user.id,
            supplierPan: req.body.buyerPannumber,
            supplies: stock
          });
        } else {
          let exist = buyer.supplies.includes(stock._id) || false;
          if (!exist) {
            buyer = await Buyer.updateOne(buyer, {
              userId: req.user.id,
              supplierPan: req.body.buyerPannumber,
              $push: {
                supplies: stock
              }
            });
          }
        }
        await buyerDetails.updateOne(validator, {
          $inc: {
            amount:
              parseInt(req.body.Quantity) * parseInt(req.body.Sellingprice)
          }
        });
        res.redirect('/home');
      }
    }
  } catch (err) {
    next(err);
  }
};
