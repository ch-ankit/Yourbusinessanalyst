const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
exports.gpage = async (req, res) => {
<<<<<<< HEAD
  const user = await User.findOne({ id: req.user.id });
  let supplies = await Supplier.findOne({ userId: req.user.id }).populate('supplies');
  res.render('party', {
    title: 'Party',
    admin: user.username,
    src: './../images/smiley.jpg',
    suppliers: supplies.supplies
  });
=======
  try {
    const user = await User.findOne({ id: req.user.id });
    res.render('party', {
      title: 'Party',
      admin: user.username,
      src: './../images/smiley.jpg'
    });
  } catch (err) {
    next(err);
  }
>>>>>>> a0d77da9096cacd29c594cbd5645122968c35025
};

exports.addparty = (req, res) => { };
