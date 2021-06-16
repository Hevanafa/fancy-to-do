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
import { getImgSrc } from "../../modules/generics";

import "./index.scss";

interface IProps {
	calendarDate: Date;
	tasks: Map<string, ITaskItem[]>;
}
export default class Calendar extends React.Component<IProps> {
	getDaysOfWeek = () =>
		[...new Array(7)].map((_, i) => getDayName(i));

	getCalendarRows() {
		const { calendarDate } = this.props;

		const monthLength = getMonthDays(calendarDate);
		const rows = [...new Array(Math.ceil(monthLength / 7))].map(_ =>
			[...new Array(7)].map(_ => 0)
		);

		// b: row
		// a: column
		for (let b = 0, a = getFirstDayOfMonth(calendarDate).getDay(), day = 1;
			day <= monthLength;
			day++) {

			rows[b][a] = day;
			a++;

			if (a >= 7) {
				b++;
				a -= 7;
			}
		}

		return rows;
	}

	componentDidMount() {
		console.log(this.getCalendarRows());
	}

	render() {
		const {
			calendarDate,
			tasks
		} = this.props;

		const todayDate = getTodayDate(),
			tomorrowDate = getTomorrowDate();

		const calendarYearMonthStr = Intl.DateTimeFormat("zh-TW", {
			year: "numeric",
			month: "2-digit"
		}).format(calendarDate);

		console.log(calendarYearMonthStr);

		return (
			<>
				<div className="long-press-hint">
					Hint: Long press :)
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

				<div className="calendar-container">
					{
						this.getCalendarRows().map(row =>
							row.map((day, idx) => {
								const chosenDate = calendarDate.getDate();
								const isSelected = chosenDate === day;

								const dayStr = `${calendarYearMonthStr}/${day}`;
								const isToday = dayStr === DBDateFormatter.format(todayDate);
								const isTomorrow = dayStr === DBDateFormatter.format(tomorrowDate);

								// Task List
								const taskListRef = tasks.get(dayStr);

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

								// Todo: add the details

								return (
									<div
										key={`day_${idx}`}
										className={className}>
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
					[Insert some inspirational quotes here]
				</div>
			</>
		);
	}
}
