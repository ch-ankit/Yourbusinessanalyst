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
    } else {
      name = supDetails.name;
      amount = supDetails.amount;
      address = supDetails.address;
      contactNumber = supDetails.contactNumber;
      panNumber = supDetails.pan;
    }
    console.log(buyDetails);
    console.log(supDetails);
    console.log(amount);
    res.render('clientandsupplier', {
      title: req.query.name,
      admin: user.username,
      src: `./../images/users/${user.photo}`,
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
