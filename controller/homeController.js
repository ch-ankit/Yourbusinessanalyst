const moment = require('moment');

exports.ghmpage = (req, res) => {
  res.render('index', {
    title: 'Homepage',
    admin: 'user',
    accessTime: moment().format()
  });
};
