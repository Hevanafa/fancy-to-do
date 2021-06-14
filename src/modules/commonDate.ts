const DBDateFormatter = new Intl.DateTimeFormat("zh-CN", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

const NormalDateFormatter = new Intl.DateTimeFormat("en-ID", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

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

	getYesterdayDate,
	getTodayDate,
	getTomorrowDate,
	validateDateFormat
}