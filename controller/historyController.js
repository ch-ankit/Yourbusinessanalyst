const User = require('./../models/userModel');
const History = require('../models/stocksHistoryModel');
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const history = await History.find({ userId: req.user.id });
    res.render('history', {
      title: 'Transaction History',
      admin: user.username,
      src: `./../images/users/${user.photo}`
    });
  } catch (err) {
    next(err);
  }
};
