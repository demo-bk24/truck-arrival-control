const {
	yearsFn,
	monthFn,
	daysToYearAndMonth
} = require('../../../helpers/helpers');
const respond = require('../../../helpers/apiResponse');

const getYears = (req, res) => {
	try {
		const years = yearsFn(2022, 2025);
		return respond.success(res, years);
	} catch (error) {
		return respond.error(res, error);
	}
};

const getMonths = (req, res) => {
	try {
		const { year } = req.params;
		const months = monthFn(year);
		return respond.success(res, months);
	} catch (error) {
		return respond.error(res, error);
	}
};

const getDays = (req, res) => {
	try {
		const { year, month } = req.params;
		const days = daysToYearAndMonth(year, month);
		return respond.success(res, days);
	} catch (error) {
		console.log(error);
		return respond.error(res, error);
	}
};

module.exports = {
	getYears,
	getMonths,
	getDays
};
