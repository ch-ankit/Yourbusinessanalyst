const multer = require('multer');
const sharp = require('sharp');

const User = require('./../models/userModel');
const Supplier = require('./../models/supplierModel');
const supplierDetails = require('./../models/suppliersBuyersDetailModel')
  .supplierDetails;

/////////////////////////////////////////////////
//MULTER WORKS
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    console.log('Please Enter a valid Image');
    cb(err, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.updateSupplierPhoto = upload.single('sphoto');

exports.resizeSupplierPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      throw Error('File Not Found');
    } else {
      req.file.filename = `${req.user.id}-${req.body.panNumber}.jpeg`;
      sharp(req.file.buffer)
        .resize(500, 500)
        .withMetadata()
        .rotate()
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/suppliers/${req.file.filename}`);
      next();
    }
  } catch (err) {
    next();
  }
};
/////////////////////////////////////////////////
///////

exports.getSuppliers = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const suppliers = await Supplier.find({ userId: req.user.id }, '-_id -__v');
    res.render('suppliers', {
      title: 'Suppliers',
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      suppliers: suppliers
    });
  } catch (err) {
    next(err);
  }
};

exports.addSuppliers = async (req, res, next) => {
  try {
    let photo = 'default.jpeg';
    if (!req.file) {
      photo = 'default.jpeg';
    } else {
      photo = req.file.filename;
    }
    const docs = await supplierDetails.findOneAndUpdate(
      {
        userId: req.user.id,
        pan: req.body.panNumber
      },
      {
        userId: req.user.id,
        name: req.body.supplierName,
        amount: req.body.amount,
        pan: req.body.panNumber,
        contactNumber: req.body.contact,
        address: req.body.address,
        photo: photo
      },
      { upsert: true }
    );
    res.redirect('/suppliers');
  } catch (err) {
    next(err);
  }
};
