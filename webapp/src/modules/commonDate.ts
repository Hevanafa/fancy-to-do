const defaultLocalisation = "en-GB";
const defaultDBLocalisation = "zh-TW";

const DBDateFormatter = new Intl.DateTimeFormat(defaultDBLocalisation, {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

const NormalDateFormatter = new Intl.DateTimeFormat(defaultLocalisation, {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

const getReadableDate = (date: Date) =>
	Intl.DateTimeFormat(defaultLocalisation, {
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

const getFirstDayOfMonth = (date: Date) =>
	new Date(
		date.getFullYear(),
		date.getMonth(),
		1
	);

const getFirstDayOfYear = (year: number) =>
	new Date(year, 0, 1);

const oneDayMillis = 8.64e7;

/**
 * Warning: this function may not be accurate to represent the real day of the year.
 * @param date 
 * @returns the day of the year
 */
function getDayOfYear(date: Date) {
	const diff = date.getTime() - getFirstDayOfYear(date.getFullYear()).getTime();
	return Math.ceil(diff / oneDayMillis);
}

const isLeapYear = (year: number) =>
	(year % 4 === 0 && year % 100 > 0) || year % 400 === 0;

function getMonthDays(date: Date) {
	const month = date.getMonth() + 1;

	return (
		[4, 6, 9, 11].includes(month)
			? 30
			: month === 2 ? (
				isLeapYear(date.getFullYear())
					? 29
					: 28
			) : 31
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
			.toLocaleString(defaultLocalisation, {
				weekday: short ? "short" : "long"
			});

/**
 * Returns the name of the month:
 * 0: January
 * 11: December
 */
const getMonthName = (month: number, short = true) =>
	month < 0 || month > 11
		? `Wrong month: ${month}`
		: new Date(2021, month, 1)
			.toLocaleString(defaultLocalisation, {
				month: short ? "short" : "long"
			});

const getYearStr = (year: number) =>
	new Intl.NumberFormat(defaultLocalisation).format(year);

/**
 * Basic date string format validator.
 * @param dateStr Date in dd/mm/yyyy or yyyy/mm/dd format, with either slash or dash as the separator.
 */
const validateDateFormat = (dateStr: string) =>
	!!dateStr.match(/^(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{4})$/);

export {
	defaultLocalisation,
	defaultDBLocalisation,

	DBDateFormatter,
	NormalDateFormatter,
	getReadableDate,

	getYesterdayDate,
	getTodayDate,
	getTomorrowDate,

	getFirstDayOfMonth,
	getFirstDayOfYear,
	getDayOfYear,
	getMonthDays,

	getDayName,
	getMonthName,
	getYearStr,

	validateDateFormat
}