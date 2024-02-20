const { Schema, model } = require('mongoose');

const CampusSchema = Schema(
	{
		name: {
			type: String,
			required: true
		},
		code: {
			type: String,
			required: true,
			uppercase: true,
			trim: true,
			unique: true
		},
		goalSorting: {
			type: Number,
			required: true
		},
		goalPicking: {
			type: Number,
			required: true
		},
		goalControl: {
			type: Number,
			required: true
		},
		region: {
			type: String
		}
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model('Campus', CampusSchema);
