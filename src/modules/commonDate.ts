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

function getTodayDate () {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);
}

function getTomorrowDate () {
	const today = new Date();

	return new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 1
	);
}

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
	validateDateFormat
}