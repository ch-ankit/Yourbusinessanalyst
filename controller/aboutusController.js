//importing models

const User = require('./../models/userModel');

//renders a page as response to get request

exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    res.render('aboutus', {
      title: 'About Us',
      admin: user.username,
      src: `./../images/users/${user.photo}`
    });
  } catch (err) {
    //handling errors using middleware
    next(err);
  }
};
