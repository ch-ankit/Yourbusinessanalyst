const User = require('./../models/userModel');
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');
const moment = require('moment');
exports.gacpage = async (req, res, next) => {
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
    var cTAmount = 0;
    cAmounts.forEach(el => {
      cTAmount += el;
    });
    var sTAmount = 0;
    sAmounts.forEach(el => {
      sTAmount += el;
    });
    amounts = [cTAmount, sTAmount];
    res.render('Accounts', {
      title: 'Accounts',
      admin: user.username,
      accesstime: moment().format(),
      src: `./../images/users/${user.photo}`,
      amount: amounts,
      supplierDetail: supDetails,
      buyerDetails: buyDetails
    });
  } catch (err) {
    next(err);
  }
};
