const { getDaysByMonth, months } = require('../../../utils/utils');
const respond = require('../../../helpers/apiResponse');

const getMonths = (req, res) => {
	return respond.success(res, months());
};

const getDate = async (req, res) => {
	try {
		const { year, month } = req.query;
		return respond.success(res, getDaysByMonth(year, month));
	} catch (error) {
		return respond.error(res, error);
	}
};

module.exports = {
	getDate,
	getMonths
};
