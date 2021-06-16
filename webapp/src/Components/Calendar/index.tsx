import React from "react";

import { ITaskItem } from "../../App";

import {
	DBDateFormatter,
	getDayName,
	getFirstDayOfMonth,
	getMonthDays,
	getTodayDate,
	getTomorrowDate
} from "../../modules/commonDate";
import { getQuoteOfTheDay } from "../../modules/commonQuotes";

import {
	GenericOnClickEvent,
	getImgSrc
} from "../../modules/generics";

import "./index.scss";

interface IProps {
	calendarDate: Date;
	setDate: GenericOnClickEvent;
	tasks: Map<string, ITaskItem[]>;
}
export default class Calendar extends React.Component<IProps> {
	getDaysOfWeek = () =>
		[...new Array(7)].map((_, i) => getDayName(i));

	getCalendarRows() {
		const { calendarDate } = this.props;

		const monthLength = getMonthDays(calendarDate);
		let firstDayOfMonth = getFirstDayOfMonth(calendarDate).getDay();
		let rowCount = Math.ceil((firstDayOfMonth + monthLength) / 7);
		const rows = [...new Array(rowCount)].map(_ =>
			[...new Array(7)].map(_ => 0)
		);

		try {
			// b: row
			// a: column
			for (let b = 0, a = firstDayOfMonth, day = 1;
				day <= monthLength;
				day++) {

				rows[b][a] = day;
				a++;

				if (a >= 7) {
					b++;
					a -= 7;
				}
			}
		} catch (ex) {
			console.log(
				"month " + (calendarDate.getMonth() + 1),
				monthLength + " days"
			);
			console.error(ex);
		}

		return rows;
	}

	// componentDidMount() {
	// console.log(this.getCalendarRows());
	// }

	render() {
		const {
			calendarDate,
			setDate,
			tasks
		} = this.props;

		const todayDate = getTodayDate(),
			tomorrowDate = getTomorrowDate();

		const calendarYearMonthStr = Intl.DateTimeFormat("zh-TW", {
			year: "numeric",
			month: "2-digit"
		}).format(calendarDate);

		const quoteOfTheDay = getQuoteOfTheDay();

		const calendarRows = this.getCalendarRows();
		const hasMoreRows = calendarRows.length > 5;

		// console.log(calendarYearMonthStr);

		return (
			<>
				<div className="long-press-hint">
					Hint: Touch and hold month name to go to a specific month/year.
				</div>

				<div className="weekday-container">
					{
						this.getDaysOfWeek().map((day, idx) =>
							<div
								key={`day_${idx}`}
								className={idx === 0 ? "red" : "normal"}
							>
								{day}
							</div>
						)
					}
				</div>

				<div className={
					"calendar-container"
					+ (hasMoreRows ? " more-row" : "")
					}>
					{
						calendarRows.map(row =>
							row.map((day, idx) => {
								const chosenDate = calendarDate.getDate();
								const isSelected = chosenDate === day;

								const dateStr = `${calendarYearMonthStr}/${day}`;
								const isToday = dateStr === DBDateFormatter.format(todayDate);
								const isTomorrow = dateStr === DBDateFormatter.format(tomorrowDate);

								// Task List
								const taskListRef = tasks.get(dateStr);

								const taskCount = taskListRef
									? taskListRef.length
									: 0;

								const completedTaskCount = taskListRef
									? taskListRef.filter(item => item.checked).length
									: 0;

								const taskCountStr = taskListRef
									? `${completedTaskCount} / ${taskCount}`
									: "";

								const isDayComplete = taskListRef
									? completedTaskCount === taskCount
									: false;

								const className = "cell"
									+ (isSelected ? " selected" : "")
									+ (isToday ? " today" : "")
									+ (isTomorrow ? " tomorrow" : "");

								return (
									<div
										key={`day_${idx}`}
										className={className}
										{...{
											"date-str": dateStr
										}}
										onClick={day !== 0 ? setDate : undefined}>
										{
											day
												? (
													<div className="day">
														{day}
													</div>
												) : null
										}

										{
											taskCountStr
												? (
													<div className="task-count">
														{taskCountStr}
													</div>
												) : null
										}

										{
											// isToday
											// 	? (
											// 		<div className="today-marker"></div>
											// 	) : null
										}

										{
											isTomorrow
												? (
													<div className="tomorrow-marker">
														TMRW
													</div>
												) : null
										}

										{
											isSelected
												? (
													<div className="selection-border"></div>
												) : null
										}

										{
											isDayComplete
												? (
													<img
														className="complete-marker"
														src={getImgSrc("/home/white-checkmark.png")}
														alt="white checkmark"
													/>
												) : null
										}
									</div>
								);
							})
						)
					}
				</div>

				<div className="daily-motivation">
					Daily motivation<br />
					{
						typeof (quoteOfTheDay) === "string"
							? `"${quoteOfTheDay}"`
							: <>
								{`"${quoteOfTheDay[0]}"`}
								<br />
								{`-${quoteOfTheDay[1]}`}
							</>
					}
				</div>
			</>
		);
	}
}
