exports.login = (req, res) => {
  res.sendFile('login.html');
};

exports.Login = (req, res) => {
  username = req.body.username;
  password = req.body.password;
  if (username == 'admin' && password == 'admin') {
    res.render('index', {
      title: 'HomePage',
      src: './../images/smiley.jpg'
    });
  } else {
    res
      .status(400)
      .send(
        '<h1><center>AUTHENTICATION FAILED!!!</center></h1> <a href="login.html">Go To Login Page </a>'
      );
  }
};
