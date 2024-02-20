const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../account/models/user');
const { generateJWT } = require('../../../helpers/jwt');
const respond = require('../../../helpers/apiResponse');

// Login
const login = async (req, res) => {
	const { username, password, admin } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return respond.error(res, 'User not found');
		}
		if (!user.isActive) return respond.error(res, 'Your account is not active');
		if (admin) {
			if (!user.isAdmin)
				return respond.error(
					res,
					'Your account is not allowed to perform this action'
				);
		}
		// Validate password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return respond.error(res, 'Password is not valid');
		}

		const token = await generateJWT(user.id); // Generate JWT
		return respond.success(res, { user: user, token });
	} catch (error) {
		return respond.error(res, error);
	}
};

// renewToken
const renewToken = async (req, res) => {
	// Generate new JWT
	const token = await generateJWT(req.uid);
	// Get user by UID
	const user = await User.findById(req.uid);
	return respond.success(res, { user, token });
};

const existUser = async (req, res) => {
	try {
		const { document } = req.query;
		const doc = await User.findOne({ document });
		return respond.success(res, doc);
	} catch (err) {
		return respond.error(res, err);
	}
};

const register = async (req, res) => {
	try {
		const { document } = req.body;
		req.body['username'] = document;
		const user = new User(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(document, salt);
		await user.save();
		const resp = {
			username: document,
			password: document,
			firstName: user.firstName,
			lastName: user.lastName
		};
		return respond.success(res, resp);
	} catch (err) {
		return respond.error(res, err);
	}
};

module.exports = {
	login,
	renewToken,
	existUser,
	register
};
