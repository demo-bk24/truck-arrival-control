const { Schema, model } = require('mongoose');

const UserSchema = Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		document: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		licence: {
			type: String
		},
		category: {
			type: String
		},
		isControl: {
			type: Boolean,
			default: false
		},
		isDriver: {
			type: Boolean,
			default: false
		},
		isAssistant: {
			type: Boolean,
			default: false
		},
		isOperator: {
			type: Boolean,
			default: false
		},
		isSorter: {
			type: Boolean,
			default: false
		},
		isPicking: {
			type: Boolean,
			default: false
		},
		isActive: {
			type: Boolean,
			default: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		campus: {
			type: String,
			required: true
		}
	},
	{ timestamps: true, versionKey: false }
);

UserSchema.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('User', UserSchema);
