const Lift = require('../models/lift');
const respond = require('../../../helpers/apiResponse');
const LiftOperator = require('../models/lift-operator');

const listLift = async (req, res) => {
	try {
		const where = {};
		if (req.query.campus) {
			where['campus'] = { $regex: req.query.campus, $options: 'i' };
		}
		if (req.query.name) {
			where['name'] = { $regex: req.query.name, $options: 'i' };
		}
		if (req.query.isFree) {
			where['isFree'] = req.query.isFree;
		}
		if (req.query.isActive) {
			where['isActive'] = req.query.isActive;
		}
		const docs = await Lift.find(where);
		const lifts = docs.map((t) => t._doc);
		const list2 = await LiftOperator.find({})
			.select(['lift', 'operator'])
			.populate('operator', ['firstName', 'lastName', 'document']);
		const liftOperators = list2.map((t) => t._doc);
		const resp = lifts.map(
			(t) =>
				new Object({
					...t,
					operators: liftOperators.filter(
						(tt) => String(tt.lift) === String(t._id)
					)
				})
		);
		return respond.success(res, resp);
	} catch (err) {
		return respond.error(res, err);
	}
};

const createLift = async (req, res) => {
	try {
		const doc = new Lift(req.body);
		await doc.save();
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveLift = async (req, res) => {
	try {
		const doc = await Lift.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateLift = async (req, res) => {
	try {
		await Lift.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await Lift.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyLift = async (req, res) => {
	try {
		await Lift.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Lift was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createLift,
	listLift,
	retrieveLift,
	updateLift,
	destroyLift
};
