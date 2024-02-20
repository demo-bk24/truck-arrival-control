success = function (res, data) {
	return res.status(200).json(data);
};

successMsg = function (res, message) {
	return res.status(200).json({ message });
};

error = function (res, err) {
	return res.status(400).json({ error: err });
};

notFound = function (res, msg) {
	return res.status(404).json({ message: msg });
};

exist = function (res, msg) {
	return res.status(405).json({ message: msg });
};

module.exports = {
	success,
	successMsg,
	error,
	notFound,
	exist
};
