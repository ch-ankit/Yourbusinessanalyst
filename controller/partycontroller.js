const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
const suppliersDetail = require('./../models/suppliersBuyersDetailModel')
  .supplierDetail;
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    const supDetails = await suppliersDetail.find({
      userId: req.user.id
    });
    console.log(supDetails);
    res.render('party', {
      title: 'Party',
      admin: user.username,
      src: './../images/smiley.jpg',
      supplierDetail: supDetails
    });
  } catch (err) {
    next(err);
  }
};
