const LiftOperator = require('../models/lift-operator');
const respond = require('../../../helpers/apiResponse');

const createLiftOperator = async (req, res) => {
	try {
		const doc = new LiftOperator(req.body);
		await doc.save();
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveMyLift = async (req, res) => {
	try {
		const doc = await LiftOperator.findOne({ operator: req.uid }).populate(
			'lift'
		);
		if (doc) {
			return respond.success(res, doc.lift);
		}
		return respond.success(res, null);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyLiftOperator = async (req, res) => {
	try {
		await LiftOperator.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Lift Operator was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createLiftOperator,
	destroyLiftOperator,
	retrieveMyLift
};
