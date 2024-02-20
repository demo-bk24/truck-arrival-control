const moment = require('moment');

const yearsFn = (start, end) => {
	const inicio = moment(`${start}-01-01`);
	const fin = moment(`${end}-12-31`);
	return Array.from({ length: fin.diff(inicio, 'years') + 1 }, (_, index) =>
		inicio.clone().add(index, 'years').year()
	);
};

const monthFn = (year) => {
	const inicio = moment(`${year}-01-01`, 'YYYY-MM-DD');
	const fin = moment(`${year}-12-31`, 'YYYY-MM-DD');
	return Array.from({ length: fin.diff(inicio, 'months') + 1 }, (_, index) => {
		const fecha = inicio.clone().add(index, 'months');
		const mes = fecha.format('M');
		const nombreMes = fecha.format('MMM');
		const nombreMesCompleto = fecha.format('MMMM');
		return { id: Number(mes), name: nombreMes, fullName: nombreMesCompleto };
	});
};

const daysToYearAndMonth = (year, month) => {
	const mes = moment(`${year}-${month}-01`, 'YYYY-M-D');
	const ultimoDia = mes.daysInMonth();
	return Array.from({ length: ultimoDia }, (_, index) => {
		const dia = index + 1;
		const fecha = moment(`${year}-${month}-${dia}`, 'YYYY-M-D');
		const nombreDia = fecha.format('dd');
		return { id: dia, name: nombreDia };
	});
};

module.exports = {
	yearsFn,
	monthFn,
	daysToYearAndMonth
};
