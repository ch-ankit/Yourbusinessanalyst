const moment = require('moment');
const Stocks = require('./../models/stockModel');
const User = require('./../models/User');



exports.ghmpage = async (req, res) => {
	const user = await User.findOne({ id: req.user.id });
	let stock = {};
	let estimatedProfit = {};
	const docs = await Stocks.find({ userId: req.user.id }, '-_id ');
	try {
		docs.forEach(row => {

			let date = row.Date.getMonth() + row.Date.getYear();
			// console.log(date)
			if (!stock.hasOwnProperty(date)) {
				stock[date] = row.Costprice * row.Quantity;
				estimatedProfit[date] = (row.Sellingprice - row.Costprice) * row.Quantity;
				if (stock.hasOwnProperty((parseInt(date) - 1).toString())) {
					stock[date] += stock[(parseInt(date) - 1).toString()]
					estimatedProfit[date] += estimatedProfit[(parseInt(date) - 1).toString()]
				}
			} else {
				stock[date] += row.Costprice * row.Quantity;
				estimatedProfit[date] += (row.Sellingprice - row.Costprice) * row.Quantity;
			}

		});
		res.render('index', {
			title: 'Homepage',
			admin: user.username,
			accessTime: moment().format(),
			src: './../images/smiley.jpg',
			data: Object.keys(stock).map(el => stock[el]),
			data1: Object.keys(estimatedProfit).map(el => estimatedProfit[el])
		});
	} catch (err) {
		res.send(err)
	}

};
