const User = require('./../models/userModel');
const email = require('./../helpers/email')

exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    res.render('help', {
      title: 'Help',
      admin: user.username,
      src: `./../images/users/${user.photo}`
    });
  } catch (err) {
    next(err);
  }
};

exports.sendComment = async (req, res, next) => {
  try {
    email(req, res, next);
    res.redirect('/help')
  } catch (err) {
    next(err);
  }
}
