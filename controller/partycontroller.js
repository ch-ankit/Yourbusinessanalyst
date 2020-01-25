exports.gpage = (req, res) => {
  res.render('party', {
    title: 'Party',
    admin: compUser[0].username,
    src: './../images/smiley.jpg'
  });
};

exports.addparty = (req, res) => {};
