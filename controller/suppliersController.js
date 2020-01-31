const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
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
exports.addSuppliers = async (res, req, next) => {
  res.send('Site Under construction');
};
