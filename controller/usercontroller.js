const bcrypt = require('bcrypt');
const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');


const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(err, false)
  }

}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

exports.updateUserPhoto = upload.single('photo')

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id })
    if (!req.file) return next(err)
    req.file.filename = `${user.username}.jpeg`

    sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg').
      jpeg({ quality: 90 })
      .toFile(`public/images/users/${req.file.filename}`)
    next()
  } catch (err) {
    next(err)
  }
}


const saltRounds = 10;
//LOGIN

exports.getLogin = async (req, res, next) => {
  try {
    res.render('login');
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user == null || user.length == 0) {
      res.send('USERNAME OR PASSWORD NOT CORRECT');
    } else {
      let passwordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatched) {
        res.send('USERNAME OR PASSWORD NOT CORRECT');
      } else {
        let token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        res.cookie('auth-token', token);
        res.redirect('/home');
      }
    }
  } catch (err) {
    next(err);
  }
};

//SIGNUP

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.adduser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  try {
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      mobilenumber: req.body.mobilenumber,
      id: req.body.pannumber,
      password: hash,
      capital: req.body.capital
    });

    res.redirect('/user/login');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('auth-token');
  res.redirect('/user/login');
};


exports.updateMe = async (req, res, next) => {
  try {
    if (req.file) {
      const filterBody = req.file.filename;
      await User.findOneAndUpdate({ id: req.user.id }, {
        photo: filterBody
      });
      res.json({
        status: 'success',
        message: 'User has been updated'
      })
    }
  } catch (err) {
    next(err)
  }
}
