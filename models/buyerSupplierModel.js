const mongoose = require('mongoose');

const buyerSupplierSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	supplierPan: {
		type: String,
		required: true
	},
	supplies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Stocks'
		}
	]
});


exports.Buyer = mongoose.model('Buyer', buyerSupplierSchema);
exports.Supplier = mongoose.model('Supplier', buyerSupplierSchema);
