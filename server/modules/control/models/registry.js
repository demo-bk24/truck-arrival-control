const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const RegistrySchema = Schema(
	{
		driver: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		truck: {
			type: ObjectId,
			ref: 'Truck',
			required: true
		},
		origin: {
			type: String
		},
		ruc: {
			type: String
		},
		company: {
			type: String
		},
		arrival: {
			type: Date
		},
		checkInTime: {
			type: Date
		},
		checkInControl: {
			type: ObjectId,
			ref: 'User'
		},
		unloadBay: {
			type: ObjectId,
			ref: 'Bay'
		},
		unloadLift: {
			type: ObjectId,
			ref: 'Lift'
		},
		unloadStartTime: {
			type: Date
		},
		unloadEndTime: {
			type: Date
		},
		unloadUser: {
			type: ObjectId,
			ref: 'User'
		},
		loadBay: {
			type: ObjectId,
			ref: 'Bay'
		},
		loadLift: {
			type: ObjectId,
			ref: 'Lift'
		},
		loadStartTime: {
			type: Date
		},
		loadEndTime: {
			type: Date
		},
		loadUser: {
			type: ObjectId,
			ref: 'User'
		},
		exit: {
			type: Date
		},
		observation: {
			type: String
		},
		state: {
			type: String
		},
		campus: {
			type: String
		},
		occupied: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true }
	}
);

module.exports = model('Registry', RegistrySchema);
