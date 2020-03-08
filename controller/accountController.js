const moment = require('moment');

//importing models

const User = require('./../models/userModel');
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');

//renders a page as response to get request

exports.gacpage = async (req, res, next) => {
  try {
    //importing data from database

    const user = await User.findOne({ id: req.user.id });
    const supDetails = await supplierDetails.find({
      userId: req.user.id
    });
    const buyDetails = await buyerDetails.find({
      userId: req.user.id
    });

    //defining certain variables for calculating total amount to be payed and recieved

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

    //rendering page with required information

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
    //handling errors using middleware
    next(err);
  }
};
