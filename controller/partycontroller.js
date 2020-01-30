const User = require('./../models/userModel');
const Supplier = require('./../models/buyerSupplierModel').Supplier;
exports.gpage = async (req, res) => {
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
};

exports.addparty = (req, res) => { };
