const User = require('./../models/User');

const moment = require('moment');
exports.gacpage = async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  res.render('Accounts', {
    title: 'Accounts',
    admin: user.username,
    accesstime: moment().format(),
    src: './../images/smiley.jpg'
  });
};
