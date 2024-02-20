const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const get = async (req, res = response) => {
	try {
		const users = await User.find({});
		res.json({
			ok: true,
			users
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Notify the administrator'
		});
	}
};

const create = async (req, res = response) => {
	try {
		const { username, password } = req.body;
		const userExist = await User.findOne({ username });
		if (userExist) {
			return res.status(400).json({
				ok: false,
				msg: 'User already exists'
			});
		}

		const user = new User(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();
		res.json({
			ok: true,
			user
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Notify the administrator'
		});
	}
};

module.exports = {
	create,
	get
};
