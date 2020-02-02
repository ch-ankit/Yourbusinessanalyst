const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
const supplierDetail = require('./../models/suppliersBuyersDetailModel')
  .supplierDetail;

exports.getSuppliers = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    let supplies = await Supplier.findOne(
      { userId: req.user.id },
      '-_id Quantity supplierPan Costprice Modelno '
    ).populate('supplies');
    res.render('suppliers', {
      title: 'Suppliers',
      admin: user.username,
      src: './../images/smiley.jpg',
      suppliers: supplies.supplies
    });
  } catch (err) {
    next(err);
  }
};

exports.addSuppliers = async (req, res, next) => {
  console.log(req.body);
  try {
    const docs = await supplierDetail.findOneAndUpdate(
      {
        userId: req.user.id,
        pan: req.body.panNumber
      },
      {
        userId: req.user.id,
        amount: req.body.amount,
        pan: req.body.panNumber,
        contactNumber: req.body.contact,
        address: req.body.address
      },
      { upsert: true }
    );
    res.redirect('/suppliers');
  } catch (err) {
    next(err);
  }
};
