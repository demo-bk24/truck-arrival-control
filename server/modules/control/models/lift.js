const { Schema, model } = require('mongoose');

const LiftSchema = Schema(
	{
		name: { type: String, required: true, trim: true },
		isFree: { type: Boolean, default: true },
		isActive: { type: Boolean, default: false },
		campus: { type: String }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = model('Lift', LiftSchema);
