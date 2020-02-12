const User = require('./../models/userModel');
const stockHistory = require('../models/stocksHistoryModel');
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const history = await stockHistory.find({ userId: req.user.id });
    res.render('stockshistory', {
      title: 'Stocks History',
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      content: history
    });
  } catch (err) {
    next(err);
  }
};
