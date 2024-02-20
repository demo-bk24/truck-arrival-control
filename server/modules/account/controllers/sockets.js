const User = require('../models/user');

const userLoggedIn = async (uid) => {
	const user = await User.findById(uid);
	if (user) {
		user.online = true;
		await user.save();
		return user;
	}
};

const userOffline = async (uid) => {
	const user = await User.findById(uid);
	if (user) {
		user.online = false;
		await user.save();
		return user;
	}
};

const getUsers = async () => {
	const users = await User.find().sort('-online');
	return users;
};

module.exports = {
	userLoggedIn,
	userOffline,
	getUsers
};
