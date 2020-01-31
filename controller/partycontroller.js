const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
exports.gpage = async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  let supplies = await Supplier.findOne({ userId: req.user.id }).populate('supplies');
  res.render('party', {
    title: 'Party',
    admin: user.username,
    src: './../images/smiley.jpg',
  });
};

exports.addparty = (req, res) => { };
