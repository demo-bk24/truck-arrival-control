const Moment = require('moment'),
	MomentRange = require('moment-range'),
	moment = MomentRange.extendMoment(Moment);

const sumBy = (arr, fn) => {
	return (
		arr
			.map(typeof fn === 'function' ? fn : (val) => val[fn])
			.reduce((acc, val) => Number(acc) + Number(val), 0) || 0
	);
};

const months = () => {
	return [
		{
			id: 1,
			name: 'Enero'
		},
		{
			id: 2,
			name: 'Febrero'
		},
		{
			id: 3,
			name: 'Marzo'
		},
		{
			id: 4,
			name: 'Abril'
		},
		{
			id: 5,
			name: 'Mayo'
		},
		{
			id: 6,
			name: 'junio'
		},
		{
			id: 7,
			name: 'Julio'
		},
		{
			id: 8,
			name: 'Agosto'
		},
		{
			id: 9,
			name: 'Septiembre'
		},
		{
			id: 10,
			name: 'Octubre'
		},
		{
			id: 11,
			name: 'Noviembre'
		},
		{
			id: 12,
			name: 'Diciembre'
		}
	];
};

const years = () => {
	return [
		{
			id: 1,
			name: '2021'
		},
		{
			id: 2,
			name: '2022'
		},
		{
			id: 3,
			name: '2023'
		},
		{
			id: 4,
			name: '2024'
		},
		{
			id: 5,
			name: '2025'
		},
		{
			id: 6,
			name: '2026'
		},
		{
			id: 7,
			name: '2027'
		}
	];
};

const chartBar = (xAxis, yAxis) => {
	return {
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' }
		},
		legend: {},
		grid: {
			left: '0.5%',
			right: '0.5%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					rotate: 30
				},
				data: xAxis
			}
		],
		yAxis: [
			{
				type: 'value',
				name: 'Horas',
				min: 0,
				max: 4,
				position: 'right',
				axisLabel: {
					formatter: '{value} h'
				}
			},
			{
				type: 'value',
				name: 'Horas',
				min: 0,
				max: 4,
				position: 'left',
				axisLabel: {
					formatter: '{value} h'
				}
			}
		],
		series: [
			{
				name: 'KPI - ATCT',
				type: 'bar',
				yAxisIndex: 0,
				data: yAxis
			}
		]
	};
};

// Hora ingreso y hora salida
const piTct = (checkInTime, exit) => {
	return (
		moment(exit, 'DD/MM/YYYY HH:mm:ss').diff(
			moment(checkInTime, 'DD/MM/YYYY HH:mm:ss')
		) || 0
	);
};

// Hora llegada, hora ingreso y hora salida
const piAtct = (arrival, checkInTime, exit) => {
	return (
		moment(exit, 'DD/MM/YYYY HH:mm:ss').diff(
			moment(checkInTime, 'DD/MM/YYYY HH:mm:ss')
		) +
			moment(checkInTime, 'DD/MM/YYYY HH:mm:ss').diff(
				moment(arrival, 'DD/MM/YYYY HH:mm:ss')
			) || 0
	);
};

const piEspera = (arrival, checkInTime) => {
	return (
		moment(checkInTime, 'DD/MM/YYYY HH:mm:ss').diff(
			moment(arrival, 'DD/MM/YYYY HH:mm:ss')
		) || 0
	);
};

// Recargas
const piYtd = (checkInTime, exit) => {
	return (
		moment(exit, 'DD/MM/YYYY HH:mm:ss').diff(
			moment(checkInTime, 'DD/MM/YYYY HH:mm:ss')
		) || 0
	);
};

// Media noche hasta 6 am
const getHoursUploadingTruck = (date) => {
	const range = moment().range(`${date} 00:00`, `${date} 07:00`);
	const hours = Array.from(range.by('hours'));
	return hours.map((m) => ({
		id: m.format('DD/MM/YYYY'),
		name: m.format('HH')
	}));
};

/**
 * Fecha por rango
 */
const getDateByRange = (dateRange) => {
	const { startDate, endDate, dateFilter } = dateRange;
	const range = moment().range(`${startDate} 00:00`, `${endDate} 23:00`);
	switch (dateFilter) {
		case 'years':
			const years = Array.from(range.by('years'));
			return years.map((m) => ({
				yearId: m.format('YYYY'),
				date: m.format('DD/MM/YYYY')
			}));
		case 'months':
			const months = Array.from(range.by('months'));
			return months.map((m) => ({
				yearId: m.format('YYYY'),
				monthId: m.format('MM'),
				monthName: m.format('MMMM'),
				date: m.format('DD/MM/YYYY')
			}));
		case 'weeks':
			const weeks = Array.from(range.by('weeks'));
			return weeks.map((m) => ({
				yearId: m.format('YYYY'),
				monthId: m.format('MM'),
				monthName: m.format('MMMM'),
				weekId: m.format('WW'),
				date: m.format('DD/MM/YYYY')
			}));
		case 'days':
			const days = Array.from(range.by('days'));
			return days.map((m) => ({
				yearId: m.format('YYYY'),
				monthId: m.format('MM'),
				monthName: m.format('MMMM'),
				weekId: m.format('WW'),
				dayId: m.format('DD'),
				day: m.format('DD'),
				dayName: m.format('ddd'),
				date: m.format('DD/MM/YYYY')
			}));
		case 'hours':
			const hours = Array.from(range.by('hours'));
			return hours.map((m) => ({
				yearId: m.format('YYYY'),
				monthId: m.format('MM'),
				monthName: m.format('MMMM'),
				weekId: m.format('WW'),
				dayId: m.format('DD'),
				dayName: m.format('ddd'),
				hourId: m.format('HH'),
				hour: m.format('HH'),
				date: m.format('DD/MM/YYYY')
			}));
		default:
			break;
	}
};

/**
 * Sort
 */

const dynamicSort = (property) => {
	let sortOrder = 1;
	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}
	return (a, b) => {
		const result =
			a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
		return result * sortOrder;
	};
};

const getDaysByMonth = (startDate, endDate) => {
	const range = moment().range(startDate, endDate);
	return Array.from(range.by('days')).map((m) => ({
		id: m.format('DD/MM/YYYY'),
		dayName: m.format('ddd'),
		dayId: m.format('DD'),
		monthId: m.format('MM'),
		anhoId: m.format('YYYY'),
		monthName: m.format('MMM')
	}));
};

const getWeekByYear = (startDate, endDate) => {
	const range = moment().range(startDate, endDate);
	return Array.from(range.by('weeks')).map((m) => ({
		id: m.format('WW/MM/YYYY'),
		monthName: m.format('MMM'),
		weekId: m.format('WW'),
		monthId: m.format('MM'),
		anhoId: m.format('YYYY')
	}));
};

const getMonthsByYear = (startDate, endDate) => {
	const range = moment().range(startDate, endDate);
	return Array.from(range.by('months')).map((m) => ({
		id: m.format('MM/YYYY'),
		monthName: m.format('MMM'),
		monthId: m.format('MM'),
		anhoId: m.format('YYYY')
	}));
};

const removeAccents = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

module.exports = {
	getDaysByMonth,
	sumBy,
	years,
	months,
	chartBar,
	piTct,
	piAtct,
	piEspera,
	getDateByRange,
	dynamicSort,
	getWeekByYear,
	removeAccents,
	getMonthsByYear,
	piYtd,
	getHoursUploadingTruck
};
