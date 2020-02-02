const User = require('./../models/userModel');
const Buyer = require('./../models/buyerSupplierModel').Buyer;
const buyerDetail = require('./../models/suppliersBuyersDetailModel')
  .buyerDetail;
exports.getClients = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    res.render('clients', {
      title: 'Clients',
      admin: user.username,
      src: './../images/smiley.jpg'
    });
  } catch (err) {
    next(err);
  }
};
exports.addClients = async (req, res, next) => {
  try {
    const docs = await buyerDetail.findOneAndUpdate(
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
    res.redirect('/clients');
  } catch (err) {
    next(err);
  }
};

exports.getSupplies = async (req, res, next) => {
  try {
    let suppliers = await Buyer.find(
      { userId: req.user.id },
      '-_id Quantity supplierPan Costprice Modelno '
    ).populate('supplies');

    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};
