const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const LiftOperatorSchema = Schema(
	{
		lift: {
			type: ObjectId,
			ref: 'Lift',
			required: true
		},
		operator: {
			type: ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model('LiftOperator', LiftOperatorSchema);
