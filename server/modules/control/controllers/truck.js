const Truck = require('../models/truck');
const respond = require('../../../helpers/apiResponse');

const listTruck = async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const where = {};
		if (req.query.campus) {
			where['campus'] = { $regex: req.query.campus, $options: 'i' };
		}
		if (req.query.plaque) {
			where['plaque'] = { $regex: req.query.plaque, $options: 'i' };
		}
		if (req.query.type) {
			where['type'] = req.query.type;
		}
		Truck.find(where)
			.populate('type')
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.exec((err, docs) => {
				if (err) return next(err);
				Truck.countDocuments(where, (err, total) => {
					if (err) return next(err);
					return respond.success(res, { total, results: docs });
				});
			});
	} catch (err) {
		return respond.error(res, err);
	}
};

const createTruck = async (req, res) => {
	try {
		const doc = await Truck.create(req.body);
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateTruck = async (req, res) => {
	try {
		await Truck.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await Truck.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveTruck = async (req, res) => {
	try {
		const doc = await Truck.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyTruck = async (req, res) => {
	try {
		await Truck.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Truck was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

const searchTruck = async (req, res) => {
	try {
		const doc = await Truck.findOne({ plaque: req.query.plaque });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createTruck,
	listTruck,
	retrieveTruck,
	searchTruck,
	updateTruck,
	destroyTruck
};
