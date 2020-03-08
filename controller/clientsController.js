const multer = require('multer');
const sharp = require('sharp');

const User = require('./../models/userModel');
const Buyer = require('./../models/buyerSupplierModel').Buyer;
const buyerDetails = require('./../models/suppliersBuyersDetailModel')
  .buyerDetails;


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

exports.updateClientPhoto = upload.single('cphoto');


exports.resizeClientPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      throw Error('File Not Found');
    }
    else {
      req.file.filename = `${req.user.id}-${req.body.panNumber}.jpeg`;
      sharp(req.file.buffer)
        .resize(500, 500)
        .withMetadata()
        .rotate()
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/clients/${req.file.filename}`);
      next();
    }
  } catch (err) {
    next();
  }
};
/////////////////////////////////////////////////
///////

//renders a page as response to get request
exports.getClients = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    res.render('clients', {
      title: 'Clients',
      admin: user.username,
      src: `./../images/users/${user.photo}`
    });
  } catch (err) {
    next(err);
  }
};

exports.addClients = async (req, res, next) => {
  try {
    let photo = 'default.jpeg'
    if (!req.file) {
      photo = 'default.jpeg'
    } else {
      photo = req.file.filename
    }
    const docs = await buyerDetails.findOneAndUpdate(
      {
        userId: req.user.id,
        pan: req.body.panNumber
      },
      {
        userId: req.user.id,
        name: req.body.clientName,
        amount: req.body.amount,
        pan: req.body.panNumber,
        contactNumber: req.body.contact,
        address: req.body.address,
        photo: photo
      },
      { upsert: true, setDefaultsOnInsert: true }
    );
    res.redirect('/clients');
  } catch (err) {
    next(err);
  }
};

exports.getSupplies = async (req, res, next) => {
  try {
    let suppliers = await Buyer.find(
      { userId: req.user.id },
      '-_id Quantity supplierPan Costprice Modelno '
    ).populate('supplies');

    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};
