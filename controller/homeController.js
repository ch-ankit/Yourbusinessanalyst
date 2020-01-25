const moment = require('moment');

exports.ghmpage = (req, res) => {
  res.render('index', {
    title: 'Homepage',
    admin: global.compUser[0].username,
    accessTime: moment().format(),
    src: './../images/smiley.jpg'
  });
};
