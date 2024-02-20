const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const respond = require('../../../helpers/apiResponse');

const list = async (req, res, next) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const where = {};
		if (req.query.campus) {
			where['campus'] = { $regex: req.query.campus, $options: 'i' };
		}
		if (req.query.firstName) {
			where['firstName'] = { $regex: req.query.firstName, $options: 'i' };
		}
		if (req.query.lastName) {
			where['lastName'] = { $regex: req.query.lastName, $options: 'i' };
		}
		if (req.query.document) {
			where['document'] = { $regex: req.query.document, $options: 'i' };
		}
		if (req.query.isActive) {
			where['isActive'] = req.query.isActive;
		}
		if (req.query.isOperator) {
			where['isOperator'] = req.query.isOperator;
		}
		User.find(where)
			.sort({ lastName: 'asc' })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.exec((err, docs) => {
				if (err) return next(err);
				User.countDocuments(where, (err, total) => {
					if (err) return next(err);
					return respond.success(res, { total, results: docs });
				});
			});
	} catch (err) {
		return respond.error(res, err);
	}
};

const create = async (req, res = response) => {
	try {
		const { campus } = await User.findById(req.uid);
		const { document } = req.body;
		const userExist = await User.findOne({ document });
		if (userExist) {
			return respond.exist(res, 'This user already exists');
		}
		req.body.campus = campus;
		req.body['username'] = document;
		const user = new User(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(document, salt);
		await user.save();
		return respond.success(res, user);
	} catch (err) {
		return respond.error(res, err);
	}
};

const update = async (req, res) => {
	try {
		await User.findOneAndUpdate({ _id: req.params.id }, req.body);
		const doc = await User.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const retrieve = async (req, res) => {
	try {
		const doc = await User.findOne({ _id: req.params.id });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const destroy = async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id });
		return respond.successMsg(res, 'User was deleted successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

const passwordChange = async (req, res) => {
	try {
		let user = await User.findOne({ _id: req.uid }); // recuperando usuario en sesión
		if (!bcrypt.compareSync(req.body.passwordOld, user.password)) {
			return respond.error(res, 'The password is incorrect');
		}
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(req.body.password, salt);
		user.save();
		return respond.successMsg(res, 'The password was changed successfully');
	} catch (err) {
		return respond.error(res, err);
	}
};

const passwordReset = async (req, res) => {
	try {
		let admin = await User.findOne({ _id: req.uid }); // recuperando usuario en sesión
		if (!admin.isAdmin) {
			return respond.error(
				res,
				"You don't have permission to perform this action"
			);
		}
		let user = await User.findOne({ _id: req.params.id });
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(user.document, salt);
		user.save();
		return respond.successMsg(
			res,
			'The password was reseted successfully. The new password your document number'
		);
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	create,
	list,
	retrieve,
	update,
	destroy,
	passwordChange,
	passwordReset
};
