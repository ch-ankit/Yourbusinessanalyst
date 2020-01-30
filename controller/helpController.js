const User = require('./../models/userModel');

exports.gpage = async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  res.render('help', {
    title: 'Help',
    admin: user.username,
    src: './../images/smiley.jpg'
  });
};
