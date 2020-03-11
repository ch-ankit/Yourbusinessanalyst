const moment = require('moment');
const multer = require('multer');
const sharp = require('sharp');

const suppliers = require('../models/supplierModel');
const buyers = require('../models/buyerModel');
const Stocks = require('./../models/stockModel');
const User = require('./../models/userModel');
const stocksHistoryModel = require('../models/stocksHistoryModel');
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');
const chart = require('./../models/chartModel');
const model = require('./../models/modelModel');
/////////////////////////////////////////////////
//MULTER WORKS
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    console.log('Please Enter a valid Image');
    cb(err, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.updateStockPhoto = upload.single('photo');

exports.resizeStockPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      throw Error('File Not Found');
    } else {
      req.file.filename = `${req.user.id}-${req.body.Modelno}.jpeg`;
      sharp(req.file.buffer)
        .resize(500, 500)
        .withMetadata()
        .rotate()
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/stocks/${req.file.filename}`);
      next();
    }
  } catch (err) {
    next();
  }
};
/////////////////////////////////////////////////
///////

exports.gpage = async (req, res, next) => {
  const user = await User.findOne({ id: req.user.id });

  await Stocks.find(
    { userId: req.user.id },
    'Modelno Quantity Sellingprice Costprice supplierPan Date -_id',
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
  let date =
    new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
  try {
    let photoName = 'defaultStock.jpg';
    let valider = await supplierDetails.findOne({
      pan: req.body.supplierPannumber
    });
    let q = await Stocks.findOne({
      userId: req.user.id,
      Modelno: req.body.Modelno
    });
    if (!valider) {
      throw new Error('Supplier Is Not Registered, Add Suppliers first');
    } else {
      if (!req.file) {
        photoName = 'defaultStock.jpg';
      } else {
        photoName = req.file.filename;
      }

      let stock = await Stocks.findOneAndUpdate(
        {
          Modelno: req.body.Modelno,
          userId: req.user.id
        },
        {
          Costprice: Math.floor(
            (q.Costprice * q.Quantity +
              parseInt(req.body.Quantity) * parseInt(req.body.Costprice)) /
              (q.Quantity + parseInt(req.body.Quantity))
          ),
          Sellingprice: parseInt(req.body.Sellingprice),
          Modelno: req.body.Modelno,
          userId: req.user.id,
          Date: Date.now(),
          photo: photoName,
          $inc: {
            Quantity: parseInt(req.body.Quantity)
          }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      let dateModified = new Date().getFullYear() + new Date().getMonth();

      await suppliers.findOneAndUpdate(
        {
          userId: req.user.id,
          supplierPan: req.body.supplierPannumber,
          modelNo: req.body.Modelno,
          costPrice: req.body.Costprice
        },
        {
          userId: req.user.id,
          supplierPan: req.body.supplierPannumber,
          modelNo: req.body.Modelno,
          costPrice: req.body.Costprice,
          $inc: {
            quantity: parseInt(req.body.Quantity)
          }
        },
        { upsert: true }
      );

      await model.findOneAndUpdate(
        { userId: req.user.id, Date: dateModified, modelNo: req.body.Modelno },
        {
          userId: req.user.id,
          modelNo: req.body.Modelno,
          $inc: {
            quantityBought: parseInt(req.body.Quantity)
          }
        },
        { upsert: true, setDefaultsOnInsert: true }
      );

      await chart.findOneAndUpdate(
        { userId: req.user.id, Date: date },
        {
          userId: req.user.id,
          $inc: {
            estimatedProfit:
              parseInt(req.body.Quantity) *
              (parseInt(req.body.Sellingprice) - parseInt(req.body.Costprice)),
            stockValue:
              parseInt(req.body.Quantity) * parseInt(req.body.Costprice)
          }
        },
        { upsert: true, setDefaultsOnInsert: true }
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
  let date =
    new Date().getFullYear() + new Date().getMonth() + new Date().getDate();
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

        await buyers.findOneAndUpdate(
          {
            userId: req.user.id,
            buyerPan: req.body.buyerPannumber,
            modelNo: req.body.Modelno,
            sellingPrice: req.body.Sellingprice
          },
          {
            userId: req.user.id,
            buyerPan: req.body.buyerPannumber,
            modelNo: req.body.Modelno,
            sellingPrice: req.body.Sellingprice,
            $inc: {
              quantity: parseInt(req.body.Quantity)
            }
          },
          { upsert: true }
        );

        let dateModified = new Date().getFullYear() + new Date().getMonth();

        await model.findOneAndUpdate(
          {
            userId: req.user.id,
            Date: dateModified,
            modelNo: req.body.Modelno
          },
          {
            userId: req.user.id,
            modelNo: req.body.Modelno,
            $inc: {
              quantitySold: parseInt(req.body.Quantity)
            }
          },
          { upsert: true, setDefaultsOnInsert: true }
        );

        await chart.findOneAndUpdate(
          {
            userId: req.user.id,
            Date: date
          },
          {
            $inc: {
              actualProfit:
                parseInt(req.body.Quantity) * parseInt(req.body.Sellingprice),
              stockValue: -(
                parseInt(req.body.Quantity) * parseInt(stock.Costprice)
              )
            }
          },
          { upsert: true, setDefaultsOnInsert: true }
        );
        await stocksHistoryModel.create({
          soldQuantity: parseInt(req.body.Quantity),
          Sellingprice: parseInt(req.body.Sellingprice),
          method: 1,
          pan: req.body.buyerPannumber,
          Modelno: req.body.Modelno,
          userId: req.user.id,
          Date: Date.now()
        });

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
