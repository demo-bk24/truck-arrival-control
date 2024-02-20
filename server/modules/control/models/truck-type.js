const { Schema, model } = require('mongoose');

const TruckTypeSchema = Schema({
	name: {
		type: String,
		required: true,
		uppercase: true
	},
	description: { type: String },
	maxTimeUnload: { type: Number }, // minutes
	maxTimeLoad: { type: Number }, // minutes
	campus: { type: String }
});

module.exports = model('TruckType', TruckTypeSchema);
