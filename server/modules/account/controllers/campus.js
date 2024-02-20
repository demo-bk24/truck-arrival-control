const Campus = require('../models/campus');
const respond = require('../../../helpers/apiResponse');

const listCampus = async (req, res) => {
	try {
		const campus = await Campus.find({});
		return respond.success(res, campus);
	} catch (err) {
		return respond.error(res, err);
	}
};

const getCampus = async (req, res) => {
	try {
		const campus = await Campus.findOne({ code: req.params.code });
		return respond.success(res, campus);
	} catch (err) {
		return respond.error(res, err);
	}
};

const createCampus = async (req, res) => {
	try {
		const campusDB = await Campus.findOne({ code: req.body.code });
		if (campusDB) {
			return respond.exist(res, 'Sede alread exists');
		}
		const campus = new Campus(req.body);
		await campus.save();
		return respond.success(res, campus);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateCampus = async (req, res) => {
	try {
		const campus = await Campus.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		return respond.success(res, campus);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyCampus = async (req, res) => {
	try {
		await Campus.findByIdAndDelete({ _id: req.params.id });
		return respond.successMsg(res, 'Sede was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createCampus,
	listCampus,
	getCampus,
	updateCampus,
	destroyCampus
};
