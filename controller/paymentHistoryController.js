const User = require('./../models/userModel');
const paymentHistory = require('../models/paymentHistoryModel');
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const history = await paymentHistory.find({ userId: req.user.id });
    res.render('paymentHistory', {
      title: 'Payment History',
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      content: history
    });
  } catch (err) {
    next(err);
  }
};
