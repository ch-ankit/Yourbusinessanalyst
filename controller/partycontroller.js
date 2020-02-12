const User = require('./../models/userModel');
const paymentHistoryModel = require('./../models/paymentHistoryModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    const supDetails = await supplierDetails.find({
      userId: req.user.id
    });
    const buyDetails = await buyerDetails.find({
      userId: req.user.id
    });
    let sAmounts = [];
    let sName = [];
    let cAmounts = [];
    let cName = [];
    supDetails.forEach((el, index) => {
      sAmounts[index] = el.amount;
      sName[index] = el.name;
    });
    buyDetails.forEach((el, index) => {
      cAmounts[index] = el.amount;
      cName[index] = el.name;
    });

    res.render('party', {
      title: 'Party',
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      supplierDetail: supDetails,
      buyerDetails: buyDetails,
      sAmount: sAmounts,
      sName: sName,
      cAmount: cAmounts,
      cName: cName
    });
  } catch (err) {
    next(err);
  }
};

exports.paymentMade = async (req, res, next) => {
  try {
    const supplier = await supplierDetails.findOneAndUpdate(
      { userId: req.user.id, pan: req.body.supplierPanNumber },
      {
        $inc: {
          amount: -parseInt(req.body.sAmount)
        }
      }
    );
    await paymentHistoryModel.create({
      method: 0,
      amount: req.body.sAmount,
      pan: req.body.supplierPanNumber,
      userId: req.user.id,
      name: req.body.supplierName,
      Date: Date.now()
    });
    res.redirect('/home');
  } catch (err) {
    next(err);
  }
};
exports.paymentReceived = async (req, res, next) => {
  try {
    const buyer = await buyerDetails.findOneAndUpdate(
      { userId: req.user.id, pan: req.body.buyerPanNumber },
      {
        $inc: {
          amount: -parseInt(req.body.cAmount)
        }
      },
      { setDefaultsOnInsert: true }
    );
    await paymentHistoryModel.create({
      method: 1,
      amount: req.body.cAmount,
      pan: req.body.buyerPanNumber,
      userId: req.user.id,
      name: req.body.buyerName,
      Date: Date.now()
    });
    res.redirect('/home');
  } catch (err) {
    next(err);
  }
};
