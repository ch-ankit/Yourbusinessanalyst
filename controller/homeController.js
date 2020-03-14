const moment = require('moment');
const User = require('./../models/userModel');
const chart = require('./../models/chartModel');

exports.ghmpage = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.user.id });
    const docs = await chart.find({ userId: req.user.id }, '-_id -__v');

    // const docs1 = Object.keys(docs).map(el => docs[el]);

    // console.log(docs1[0].label.getFullYear() + docs1[0].label.getMonth());
    // console.log(docs1.length);

    // let monthlyEstimatedProfit = [];
    // let monthlyActualProfit = [];
    // let monthlyStockValue = [];
    // for (let i = 0; i < docs1.length; i++) {
    //   let j = 0;
    //   while (j < docs1.length) {
    //     if (
    //       docs1[j].label.getFullYear() + docs1[j].label.getMonth() ==
    //       docs1[j + 1].label.getFullYear() + docs1[j + 1].label.getMonth()
    //     ) {
    //       monthlyEstimatedProfit[j] = monthlyEstimatedProfit;
    //     }
    //   }
    // }

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
      new Date().getFullYear() -
      user.dateCreated.getFullYear() +
      (new Date().getMonth() - user.dateCreated.getMonth()) / 12 +
      (new Date().getDate() - user.dateCreated.getDate()) / 365;

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
