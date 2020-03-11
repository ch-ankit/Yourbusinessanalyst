const moment = require('moment');
const User = require('./../models/userModel');
const chart = require('./../models/chartModel');

exports.ghmpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const docs = await chart.find({ userId: req.user.id }, '-_id -__v');

    let totalEstimatedProfit = [];
    let totalActualProfit = [];
    let totalStockValue = [];

    const estimatedProfit = Object.keys(docs).map(
      el => docs[el].estimatedProfit
    );
    const actualProfit = Object.keys(docs).map(el => docs[el].actualProfit);
    const stockValue = Object.keys(docs).map(el => docs[el].stockValue);
    const labels = Object.keys(docs).map(el => docs[el].label);
    const label = labels.map(el => moment(el).format('YYYY MM DD'));

    const diffDate =
      user.dateCreated.getFullYear() -
      new Date().getFullYear() +
      (user.dateCreated.getMonth() - new Date().getMonth()) / 12 +
      (user.dateCreated.getDate() - new Date().getDate()) / 365;

    for (let i = 0; i < estimatedProfit.length; i++) {
      if (i == 0) {
        totalEstimatedProfit[i] = estimatedProfit[i];
        totalActualProfit[i] = actualProfit[i];
        totalStockValue[i] = stockValue[i];
      } else {
        totalEstimatedProfit[i] =
          estimatedProfit[i] + totalEstimatedProfit[i - 1];
        totalActualProfit[i] = actualProfit[i] + totalActualProfit[i - 1];
        totalStockValue[i] = stockValue[i] + totalStockValue[i - 1];
      }
    }
    let profitRatePerAnnum =
      totalActualProfit[totalActualProfit.length - 1] /
      ((1 / 365) * parseInt(user.capital));

    if (diffDate != 0) {
      profitRatePerAnnum =
        totalActualProfit[totalActualProfit.length - 1] /
        (diffDate * parseInt(user.capital));
    }
    const profit = totalActualProfit[totalActualProfit.length - 1];

    res.render('index', {
      title: 'Homepage',
      admin: user.username,
      accessTime: moment().format(),
      src: `./../images/users/${user.photo}`,
      testimatedProfit: totalEstimatedProfit,
      tstockValue: totalStockValue,
      tactualProfit: totalActualProfit,
      estimatedProfit: estimatedProfit,
      stockValue: stockValue,
      actualProfit: actualProfit,
      label: label,
      profitRate: profitRatePerAnnum,
      tProfit: profit,
      capital: user.capital
    });
  } catch (err) {
    next(err);
  }
};
