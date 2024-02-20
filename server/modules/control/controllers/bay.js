const Bay = require('../models/bay');
const Registry = require('../models/registry');
const respond = require('../../../helpers/apiResponse');
const moment = require('moment');
const User = require('../../account/models/user');

const listBay = async (req, res) => {
	try {
		const where = {};
		if (req.query.campus) {
			where['campus'] = { $regex: req.query.campus, $options: 'i' };
		}
		if (req.query.name) {
			where['name'] = { $regex: req.query.name, $options: 'i' };
		}
		if (req.query.isActive) {
			where['isActive'] = req.query.isActive;
		}
		const docs = await Bay.find(where).sort('name');
		return respond.success(res, docs);
	} catch (err) {
		return respond.error(res, err);
	}
};

const createBay = async (req, res) => {
	try {
		const doc = new Bay(req.body);
		await doc.save();
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const updateBay = async (req, res) => {
	try {
		await Bay.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await Bay.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieveBay = async (req, res) => {
	try {
		const doc = await Bay.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroyBay = async (req, res) => {
	try {
		await Bay.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'Bahia was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

const withRegistry = async (req, res) => {
	try {
		let campus;
		const user = await User.findById(req.uid);
		user ? (campus = user.campus) : (campus = req.query.campus);
		const today = moment().startOf('day');
		const regs = await Registry.find({
			campus,
			createdAt: {
				$gte: today.toDate(),
				$lte: moment(today).endOf('day').toDate()
			}
		})
			.select([
				'truck',
				'unloadBay',
				'unloadLift',
				'unloadStartTime',
				'loadBay',
				'loadLift',
				'loadStartTime',
				'state'
			])
			.populate({
				path: 'truck',
				select: ['plaque', 'type'],
				populate: {
					path: 'type',
					select: ['name', 'maxTimeUnload', 'maxTimeLoad']
				}
			})
			.populate('loadLift', ['name'])
			.populate('unloadLift', ['name']);
		const registros = regs.map((item) => item._doc);
		const bays = await Bay.find({ campus, isActive: true })
			.select(['name'])
			.sort('name');
		const bahias = bays.map((bay) => {
			let unload = null;
			let load = null;
			unload = registros.find(
				(reg) =>
					String(reg.unloadBay) === String(bay._id) &&
					(reg.state === 'DESCARGA' || reg.state === 'DESCARGANDO')
			);
			load = registros.find(
				(reg) =>
					String(reg.loadBay) === String(bay._id) &&
					(reg.state === 'CARGA' || reg.state === 'CARGANDO')
			);
			return new Object({ ...bay._doc, unload, load });
		});
		return respond.success(res, bahias);
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	createBay,
	listBay,
	withRegistry,
	retrieveBay,
	updateBay,
	destroyBay
};
