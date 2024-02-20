const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

// Login
const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Verify if the user exists
		const userDB = await User.findOne({ username });
		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'User not found'
			});
		}

		// Validate password
		const validPassword = bcrypt.compareSync(password, userDB.password);
		if (!validPassword) {
			return res.status(404).json({
				ok: false,
				msg: 'Password incorrect'
			});
		}

		// Generate JWT
		const token = await generateJWT(userDB.id);

		res.json({
			ok: true,
			user: userDB,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Notify the administrator'
		});
	}
};

// renewToken
const renewToken = async (req, res) => {
	const uid = req.uid;

	// Generate new JWT
	const token = await generateJWT(uid);

	// Get user by UID
	const user = await User.findById(uid);

	res.json({
		ok: true,
		user,
		token
	});
};

module.exports = {
	login,
	renewToken
};
