const User = require('./../models/userModel');
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
      src: './../images/smiley.jpg',
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
