exports.gpage = (req, res) => {
  res.render('aboutus', {
    title: 'About Us',
    admin: global.compUser[0].username,
    src: './../images/smiley.jpg'
  });
};
