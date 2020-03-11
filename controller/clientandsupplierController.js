//importing model
const User = require('./../models/userModel');
const {
  supplierDetails,
  buyerDetails
} = require('./../models/suppliersBuyersDetailModel');

//renderng a page as response to get request

exports.gpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    //importing suitable data

    const supDetails = await supplierDetails.findOne({
      userId: req.user.id,
      name: req.query.name
    });
    const buyDetails = await buyerDetails.findOne({
      userId: req.user.id,
      name: req.query.name
    });

    //declearing variables

    var name, amount, address, contactNumber, panNumber;

    //checking whether to render buyer or supplier

    if (req.query.type == 'buyer') {
      name = buyDetails.name;
      amount = buyDetails.amount;
      address = buyDetails.address;
      contactNumber = buyDetails.contactNumber;
      panNumber = buyDetails.pan;
      src1 = `./../images/clients/${buyDetails.photo}`;
    } else {
      name = supDetails.name;
      amount = supDetails.amount;
      address = supDetails.address;
      contactNumber = supDetails.contactNumber;
      panNumber = supDetails.pan;
      src1 = `./../images/suppliers/${supDetails.photo}`;
    }

    //rendering a page with required data

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
