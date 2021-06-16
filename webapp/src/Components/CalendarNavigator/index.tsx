import React from "react";

import {
	DBDateFormatter,
	getTodayDate,
	getTomorrowDate,
	getYesterdayDate
} from "../../modules/commonDate";

import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

interface IProps {
	isHome: boolean;
	isCalendar: boolean;
	calendarDate: Date;
	setDate: GenericOnClickEvent;
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
			alert("Long press!");
		}, 500);
	}

	handleTouchEnd(_: React.TouchEvent) {
		window.clearTimeout(this.longPressTimeout);
	}

	getMonthStr = (date: Date) =>
		Intl.DateTimeFormat("zh-TW", {
			year: date.getFullYear() !== this.props.calendarDate.getFullYear() ? "numeric" : undefined,
			month: "long"
		}).format(date);

	getThisMonthStr = () =>
		Intl.DateTimeFormat("zh-TW", {
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

		const lastMonthStr = this.getMonthStr(prevMonth);
		const thisMonthStr = this.getThisMonthStr();
		const nextMonthStr = this.getMonthStr(nextMonth);

		return (
			<div className="calendar-nav-container on-calendar">
				<div
					{...{
						"date-str": DBDateFormatter.format(prevMonth)
					}}
					onClick={setDate}>
					{lastMonthStr}
				</div>
				<div
					className="active"
					// onMouseDown={this.handleMouseDown.bind(this)}
					// onMouseUp={this.handleMouseUp.bind(this)}
					onTouchStart={this.handleTouchStart.bind(this)}
					onTouchEnd={this.handleTouchEnd.bind(this)}
					>
					{thisMonthStr}
				</div>
				<div
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
			isCalendar
		} = this.props;

		return (
			isHome
				? this.renderOnHome()
				: isCalendar
					? this.renderOnCalendar()
					: null
		);
	}
}