exports.gpage = (req, res) => {
  res.render('help', {
    title: 'Help',
    admin: global.compUser[0].username,
    src: './../images/smiley.jpg'
  });
};
