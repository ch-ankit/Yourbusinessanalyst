const User = require('./../models/userModel');

const moment = require('moment');
exports.gacpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    res.render('Accounts', {
      title: 'Accounts',
      admin: user.username,
      accesstime: moment().format(),
      src: './../images/smiley.jpg'
    });
  } catch (err) {
    next(err);
  }

};
