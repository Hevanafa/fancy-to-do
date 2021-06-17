import React from "react";

import {
	DBDateFormatter,
	defaultLocalisation,
	getTodayDate,
	getTomorrowDate,
	getYesterdayDate
} from "../../modules/commonDate";

import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

interface IProps {
	isHome: boolean;
	isEditMode: boolean;
	isCalendar: boolean;
	calendarDate: Date;

	setDate: GenericOnClickEvent;
	showGoToMonthModal: () => void;
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


	renderOnHome() {
		const {
			setDate
		} = this.props;

		const [yesterday, today, tomorrow] = [
			this.isYesterday(),
			this.isToday(),
			this.isTomorrow()
		];

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

	longPressTimeout = 0;
	handleTouchStart(_: React.TouchEvent) {
		this.longPressTimeout = window.setTimeout(() => {
			this.props.showGoToMonthModal();
		}, 500);
	}

	handleTouchEnd(_: React.TouchEvent) {
		window.clearTimeout(this.longPressTimeout);
	}

	getMonthStr = (date: Date) =>
		Intl.DateTimeFormat(defaultLocalisation, {
			year: date.getFullYear() !== this.props.calendarDate.getFullYear() ? "numeric" : undefined,
			month: "long"
		}).format(date);

	getThisMonthStr = () =>
		Intl.DateTimeFormat(defaultLocalisation, {
			year: "numeric",
			month: "long"
		}).format(this.props.calendarDate);

	renderOnCalendar() {
		const {
			calendarDate,
			setDate
		} = this.props;

		const prevMonth = new Date(
			calendarDate.getFullYear(),
			calendarDate.getMonth() - 1,
			1
		);

		const nextMonth = new Date(
			calendarDate.getFullYear(),
			calendarDate.getMonth() + 1,
			1
		);

		const lastMonthStr = this.getMonthStr(prevMonth),
			thisMonthStr = this.getThisMonthStr(),
			nextMonthStr = this.getMonthStr(nextMonth),
			
			lastMonthClassName = lastMonthStr.length > 10 ? "long-month" : undefined,
			thisMonthClassName = "active" + (thisMonthStr.length > 10 ? " long-month" : undefined),
			nextMonthClassName = nextMonthStr.length > 10 ? "long-month" : undefined;

		return (
			<div className="calendar-nav-container on-calendar">
				<div
					className={lastMonthClassName}
					{...{
						"date-str": DBDateFormatter.format(prevMonth)
					}}
					onClick={setDate}>
					{lastMonthStr}
				</div>
				<div
					className={thisMonthClassName}
					onTouchStart={this.handleTouchStart.bind(this)}
					onTouchEnd={this.handleTouchEnd.bind(this)}
					>
					{thisMonthStr}
				</div>
				<div
					className={nextMonthClassName}
					{...{
						"date-str": DBDateFormatter.format(nextMonth)
					}}
					onClick={setDate}>
					{nextMonthStr}
				</div>
			</div>
		);
	}

	render() {
		const {
			isHome,
			isEditMode,
			isCalendar
		} = this.props;

		return (
			isHome || isEditMode
				? this.renderOnHome()
				: isCalendar
					? this.renderOnCalendar()
					: null
		);
	}
}