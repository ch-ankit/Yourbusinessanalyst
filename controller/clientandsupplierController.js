const User = require('./../models/userModel');

const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');

exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    const supDetails = await supplierDetails.findOne({
      userId: req.user.id,
      name: req.query.name
    });
    const buyDetails = await buyerDetails.findOne({
      userId: req.user.id,
      name: req.query.name
    });

    var name, amount, address, contactNumber, panNumber;

    if (supDetails == null) {
      name = buyDetails.name;
      amount = buyDetails.amount;
      address = buyDetails.address;
      contactNumber = buyDetails.contactNumber;
      panNumber = buyDetails.pan;
      src1 = `./../images/clients/${buyDetails.photo}`
    } else {
      name = supDetails.name;
      amount = supDetails.amount;
      address = supDetails.address;
      contactNumber = supDetails.contactNumber;
      panNumber = supDetails.pan;
      src1 = `./../images/suppliers/${supDetails.photo}`
    }

    res.render('clientandsupplier', {
      title: req.query.name,
      admin: user.username,
      src: `./../images/users/${user.photo}`,
      src1: src1,
      name,
      panNumber,
      address,
      contactNumber,
      amount
    });
  } catch (err) {
    next(err);
  }
};
