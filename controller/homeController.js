const moment = require('moment');
const Stocks = require('./../models/stockModel');
const User = require('./../models/userModel');
const Buyer = require('./../models/buyerSupplierModel').Buyer;

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
exports.ghmpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    let stock = {};
    let estimatedProfit = {};
    let actualProfit = {};
    let dates = [];
    var i = 0;
    let currentDate,
      prevDate = null;
    const docs = await Stocks.find({ userId: req.user.id }, '-_id ');
    docs.forEach(row => {
      dates[i] = row.Date;
      currentDate = moment(dates[i]).format('YYYY MM DD');
      if (!prevDate) {
        stock[currentDate] = parseInt(row.Quantity) * parseInt(row.Costprice);
        estimatedProfit[currentDate] =
          parseInt(row.Quantity) *
          (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        actualProfit[currentDate] =
          parseInt(row.soldQuantity) *
          (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        prevDate = currentDate;
      } else if (currentDate == prevDate) {
        stock[currentDate] += parseInt(row.Quantity) * parseInt(row.Costprice);
        estimatedProfit[currentDate] +=
          parseInt(row.Quantity) *
          (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        actualProfit[currentDate] +=
          parseInt(row.soldQuantity) *
          (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        prevDate = currentDate;
      } else if (prevDate != currentDate) {
        stock[currentDate] =
          stock[prevDate] + parseInt(row.Quantity) * parseInt(row.Costprice);
        estimatedProfit[currentDate] =
          estimatedProfit[prevDate] +
          parseInt(row.Quantity) *
            (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        actualProfit[currentDate] =
          actualProfit[prevDate] +
          parseInt(row.soldQuantity) *
            (parseInt(row.Sellingprice) - parseInt(row.Costprice));
        prevDate = currentDate;
      }
      i++;
    });
    dates = dates.map(date => moment(date).format('YYYY MM DD'));
    let uniqueDates = dates.filter(onlyUnique);

    res.render('index', {
      title: 'Homepage',
      admin: user.username,
      accessTime: moment().format(),
      src: `./../images/users/${user.photo}`,
      stock: Object.keys(stock).map(el => stock[el]),
      estimatedProfit: Object.keys(estimatedProfit).map(
        el => estimatedProfit[el]
      ),
      actualProfit: Object.keys(actualProfit).map(el => actualProfit[el]),
      labels: uniqueDates
    });
  } catch (err) {
    next(err);
  }
};
