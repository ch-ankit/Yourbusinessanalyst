const moment = require('moment');

exports.gacpage = (req, res) => {
  res.render('Accounts', {
    title: 'Accounts',
    admin: compUser[0].username,
    accesstime: moment().format(),
    src: './../images/smiley.jpg'
  });
};
