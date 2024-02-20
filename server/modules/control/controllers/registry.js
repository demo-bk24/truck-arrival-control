const moment = require('moment');
const Registry = require('../models/registry');
const User = require('../../../modules/account/models/user');
const Truck = require('../models/truck');
const LiftOperator = require('../models/lift-operator');
const respond = require('../../../helpers/apiResponse');

function whereToday() {
	const today = moment().startOf('day');
	return {
		createdAt: {
			$gte: today.toDate(),
			$lte: moment(today).endOf('day').toDate()
		}
	};
}

const listRegistry = async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const where = {};
		if (req.query.campus) {
			where['campus'] = { $regex: req.query.campus, $options: 'i' };
		}
		if (req.query.document) {
			const drivers = await User.find({
				document: { $regex: req.query.document, $options: 'i' }
			});
			const ids = drivers.map((t) => String(t._id));
			where['driver'] = { $in: ids };
		}
		if (req.query.plaque) {
			const trucks = await Truck.find({
				plaque: { $regex: req.query.plaque, $options: 'i' }
			});
			const ids = trucks.map((t) => String(t._id));
			where['truck'] = { $in: ids };
		}
		if (req.query.fecha) {
			where['createdAt'] = {
				$gte: moment(req.query.fecha).startOf('day').toDate(),
				$lte: moment(req.query.fecha).endOf('day').toDate()
			};
		}
		Registry.find(where)
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: { path: 'type', select: ['name'] }
			})
			.populate('driver', ['document', 'firstName', 'lastName'])
			.populate('unloadBay', ['name'])
			.populate('loadBay', ['name'])
			.populate('unloadLift', ['name'])
			.populate('loadLift', ['name'])
			.sort('createdAt')
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.exec((err, docs) => {
				if (err) return next(err);
				Registry.countDocuments(where, (err, total) => {
					if (err) return next(err);
					return respond.success(res, { total, results: docs });
				});
			});
	} catch (err) {
		return respond.error(res, err);
	}
};

const createRegistry = async (req, res) => {
	try {
		const { campus } = await User.findById(req.uid);
		req.body.campus = campus;
		const doc = await Registry.create(req.body);
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateRegistry = async (req, res) => {
	try {
		await Registry.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await Registry.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveRegistry = async (req, res) => {
	try {
		const doc = await Registry.findOne({ _id: req.params.id })
			.populate('truck')
			.populate('driver');
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyRegistry = async (req, res) => {
	try {
		await Registry.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Registry was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

// for driver
const registryForNow = async (req, res) => {
	try {
		const where = {
			...whereToday(),
			driver: req.uid,
			state: { $ne: 'SALIDA' }
		};
		const doc = await Registry.findOne(where)
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: { path: 'type', select: ['name'] }
			})
			.populate('unloadBay', ['name'])
			.populate('loadBay', ['name']);

		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

// for driver whitout query
// for control whit query.driver
const initialRegistry = async (req, res) => {
	try {
		const where = {
			...whereToday(),
			driver: req.query.driver ? req.query.driver : req.uid,
			state: { $ne: 'SALIDA' }
		};
		const doc = await Registry.findOne(where)
			.populate('driver', [
				'document',
				'firstName',
				'lastName',
				'licence',
				'category'
			])
			.populate({
				path: 'truck',
				select: ['plaque', 'type', 'origin', 'company'],
				populate: { path: 'type', select: ['name'] }
			});
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

// for control & Assistant
const arrivals = async (req, res) => {
	try {
		let campus;
		const user = await User.findById(req.uid);
		user ? (campus = user.campus) : (campus = req.query.campus);
		const where = {
			...whereToday(),
			campus,
			arrival: { $ne: null }
		};
		const docs = await Registry.find(where)
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: { path: 'type', select: ['name'] }
			})
			.populate('driver', ['document', 'firstName', 'lastName'])
			.populate('unloadBay', ['name'])
			.populate('unloadLift', ['name'])
			.populate('loadBay', ['name'])
			.populate('loadLift', ['name'])
			.sort('-createdAt');
		return respond.success(res, docs);
	} catch (err) {
		return respond.error(res, err);
	}
};

// for operator
const unloadTruck = async (req, res) => {
	try {
		const doc = await LiftOperator.findOne({ operator: req.uid }).populate(
			'lift'
		);
		if (!doc) return respond.error(res, 'You must have a lift assigned!');
		const today = moment().startOf('day');
		const reg = await Registry.findOne({
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today).endOf('day').toDate()
			},
			unloadLift: doc.lift._id,
			state: { $in: ['DESCARGA', 'DESCARGANDO'] }
		})
			.select([
				'truck',
				'checkInTime',
				'unloadBay',
				'unloadLift',
				'unloadStartTime',
				'state',
				'occupied',
				'unloadUser'
			])
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: { path: 'type', select: ['name', 'maxTimeUnload'] }
			})
			.populate('unloadBay', ['name'])
			.populate('unloadLift', ['name']);
		return respond.success(res, reg);
	} catch (err) {
		return respond.error(res, err);
	}
};

// for operator
const loadTruck = async (req, res) => {
	try {
		const doc = await LiftOperator.findOne({ operator: req.uid }).populate(
			'lift'
		);
		if (!doc) return respond.error(res, 'YOu must have a lift assigned!');
		const today = moment().startOf('day');
		const reg = await Registry.findOne({
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today).endOf('day').toDate()
			},
			loadLift: doc.lift._id,
			state: { $in: ['CARGA', 'CARGANDO'] }
		})
			.select([
				'truck',
				'checkInTime',
				'loadBay',
				'loadLift',
				'loadStartTime',
				'state',
				'occupied',
				'loadUser'
			])
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: { path: 'type', select: ['name', 'maxTimeLoad'] }
			})
			.populate('loadBay', ['name'])
			.populate('loadLift', ['name']);
		return respond.success(res, reg);
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	listRegistry,
	createRegistry,
	retrieveRegistry,
	updateRegistry,
	destroyRegistry,
	registryForNow,
	initialRegistry,
	arrivals,
	unloadTruck,
	loadTruck
};
