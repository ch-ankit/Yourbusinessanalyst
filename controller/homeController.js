const moment = require('moment');
const Stocks = require('./../models/stockModel');
const User = require('./../models/User');

exports.ghmpage = async (req, res) => {
	const user = await User.findOne({ id: req.user.id });
	let stock = {};

	const docs = await Stocks.find({ userId: req.user.id }, '-_id ');
	try {
		// console.log(docs);
		docs.forEach(row => {

			let date = row.Date.getMonth() + row.Date.getYear();
			// console.log(date)
			if (!stock.hasOwnProperty(date)) {
				stock[date] = row.Costprice * row.Quantity;
				if (stock.hasOwnProperty((parseInt(date) - 1).toString())) {
					stock[date] += stock[(parseInt(date) - 1).toString()]
				}
			} else {

				console.log(row.Costprice, row.Quantity)
				stock[date] += row.Costprice * row.Quantity;
			}

		});
		console.log(stock)
		res.render('index', {
			title: 'Homepage',
			admin: user.username,
			accessTime: moment().format(),
			src: './../images/smiley.jpg',
			data: Object.keys(stock).map(el => stock[el]),
			data1: [
				10000,
				14000,
				56000,
				78000,
				90000,
				123000,
				45000,
				10000,
				12311,
				32132,
				11111,
				2222,
				3333,
				4444,
				5555,
				666,
				777
			]
		});
	} catch (err) {
		res.send(err)
	}

};
