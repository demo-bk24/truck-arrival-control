const TruckType = require('../models/truck-type');
const respond = require('../../../helpers/apiResponse');
const User = require('../../account/models/user');

const listTruckType = async (req, res) => {
	try {
		const { campus } = await User.findById(req.uid);
		const docs = await TruckType.find({ campus });
		return respond.success(res, docs);
	} catch (err) {
		return respond.error(res, err);
	}
};

const createTruckType = async (req, res) => {
	try {
		const doc = new TruckType(req.body);
		await doc.save();
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveTruckType = async (req, res) => {
	try {
		const doc = await TruckType.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveTruckTypeByType = async (req, res) => {
	try {
		const doc = await TruckType.findOne({ name: req.params.type });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateTruckType = async (req, res) => {
	try {
		await TruckType.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await TruckType.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyTruckType = async (req, res) => {
	try {
		await TruckType.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Truck Type was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createTruckType,
	listTruckType,
	retrieveTruckType,
	retrieveTruckTypeByType,
	updateTruckType,
	destroyTruckType
};
