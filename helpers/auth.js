const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  let token = req.cookies['auth-token'];
  // console.log('COOKOIEEEEEEEE', token);
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = verified;
  next();
};

module.exports = auth;
