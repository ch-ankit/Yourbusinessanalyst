const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
const supplierDetail = require('./../models/suppliersBuyersDetailModel')
  .supplierDetail;

exports.getSuppliers = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    let supplies = await Supplier.find(
      { userId: req.user.id },
      '-_id Quantity supplierPan Costprice Modelno '
    ).populate('supplies');
    // let supplies = suppliers.map(el => el.supplies);
    console.log(supplies);
    res.render('suppliers', {
      title: 'Suppliers',
      admin: user.username,
      src: './../images/smiley.jpg',
      suppliers: supplies
    });
  } catch (err) {
    next(err);
  }
};

exports.addSuppliers = async (req, res, next) => {
  try {
    const docs = await supplierDetail.findOneAndUpdate(
      {
        userId: req.user.id,
        pan: req.body.panNumber
      },
      {
        userId: req.user.id,
        name: req.body.supplierName,
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

exports.getSupplies = async (req, res, next) => {
  try {
    let suppliers = await Supplier.find(
      { userId: req.user.id },
      '-_id Quantity supplierPan Costprice Modelno '
    ).populate('supplies');
    let supplies = suppliers.map(el => el.supplies);
    console.log(supplies);
    res.json(supplies);
  } catch (err) {
    next(err);
  }
};
