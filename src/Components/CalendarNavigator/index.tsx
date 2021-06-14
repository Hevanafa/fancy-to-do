import React from "react";

import {
	DBDateFormatter,
	getTodayDate,
	getTomorrowDate,
	getYesterdayDate
} from "../../modules/commonDate";

import "./index.scss";

interface IProps {
	calendarDate: Date;
	setDate: (e: React.MouseEvent) => void;
}
export default class CalendarNavigator extends React.Component<IProps> {
	dayDiff = () =>
		Math.ceil((this.props.calendarDate.getTime() - new Date().getTime()) / 86400000);

	isYesterday = () =>
		this.dayDiff() === -1;

	isToday = () =>
		this.dayDiff() === 0;

	isTomorrow = () =>
		this.dayDiff() === 1;

	
	render() {
		const { setDate } = this.props;

		const [ yesterday, today, tomorrow ] = [
			this.isYesterday(),
			this.isToday(),
			this.isTomorrow()
		];
		// { this.dayDiff() } days

		return (
			<div className="calendar-nav-container">
				<div
					className={yesterday ? "active" : ""}
					{...{
						"date-str": DBDateFormatter.format(getYesterdayDate())
					}}
					onClick={setDate}>
					Yesterday
				</div>
				<div
					className={today ? "active" : ""}
					{...{
						"date-str": DBDateFormatter.format(getTodayDate())
					}}
					onClick={setDate}>
					Today
				</div>
				<div
					className={tomorrow ? "active" : ""}
					{...{
						"date-str": DBDateFormatter.format(getTomorrowDate())
					}}
					onClick={setDate}>
					Tomorrow
				</div>
			</div>
		);
	}
}