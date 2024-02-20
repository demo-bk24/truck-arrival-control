const { Schema, model } = require('mongoose');

const TruckSchema = Schema(
	{
		plaque: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			trim: true
		},
		type: { type: String, uppercase: true, trim: true },
		origin: { type: String },
		ruc: { type: String },
		company: { type: String },
		campus: { type: String }
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model('Truck', TruckSchema);
