const User = require('./../models/userModel');
const History = require('./../models/chartModel');
exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const history = await History.find({ userId: req.user.id });
    console.log(history);
    res.render('history', {
      title: 'Transaction History',
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      content: history
    });
  } catch (err) {
    next(err);
  }
};
