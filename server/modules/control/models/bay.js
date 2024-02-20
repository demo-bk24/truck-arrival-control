const { Schema, model } = require('mongoose');

const BaySchema = Schema(
	{
		name: { type: String, required: true },
		isActive: { type: Boolean, default: true },
		campus: { type: String }
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model('Bay', BaySchema);
