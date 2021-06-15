const DBDateFormatter = new Intl.DateTimeFormat("zh-TW", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

const NormalDateFormatter = new Intl.DateTimeFormat("en-UK", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

const getReadableDate = (date: Date) =>
	Intl.DateTimeFormat("en-UK", {
		year: "numeric",
		month: "short",
		day: "numeric"
	}).format(date);

function getYesterdayDate() {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 1
	);
}

function getTodayDate() {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);
}

function getTomorrowDate() {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 1
	);
}

function getFirstDayOfMonth() {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		1
	);
}

/**
 * Returns the name of the day:
 * 0: Sunday
 * 6: Saturday
 */
const getDayName = (day: number, short = true) =>
	day < 0 || day > 6
		? `Wrong day: ${day}`
		: new Date(2020, 10, day % 7 + 1)
			.toLocaleString("zh-TW", {
				weekday: short ? "short" : "long"
			});

/**
 * Returns the name of the month:
 * 0: January
 * 11: December
 */
const getMonthName = (month: number) =>
	month < 0 || month > 11
		? `Wrong month: ${month}`
		: new Date(2021, month, 1)
			.toLocaleString("zh-TW", {
				month: "long"
			});

const getYearStr = (year: number) =>
	new Date(year).toLocaleString("zh-TW", {
		year: "numeric"
	});

// Accept dd/mm/yyyy and yyyy/mm/dd format
const validateDateFormat = (dateStr: string) =>
	!!dateStr.match(/(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{4})/);

export {
	DBDateFormatter,
	NormalDateFormatter,
	getReadableDate,

	getYesterdayDate,
	getTodayDate,
	getTomorrowDate,

	getFirstDayOfMonth,
	getDayName,
	getMonthName,
	getYearStr,

	validateDateFormat
}