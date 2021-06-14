import React from "react";
import { ITaskItem } from "../../App";
import { DBDateFormatter, getReadableDate } from "../../modules/commonDate";

interface IProps {
	calendarDate: Date;
	tasks: Map<string, ITaskItem[]>
}
export default class TaskList extends React.Component<IProps> {
	render() {
		const {
			calendarDate,
			tasks
		} = this.props;

		const dateStr = DBDateFormatter.format(calendarDate),
			taskList = tasks.get(dateStr);

		return (
			<div className="task-list-container">
				<div className="heading">
					{getReadableDate(calendarDate)}
				</div>

				<div className="scrollable-area">
					{
						taskList && taskList.length > 0
						? taskList.map((item, idx) => (
							<div
								key={`li_${idx}`}
								className="list-item">
								<div className="task-label">
									{item.label}
								</div>

								<div className="checkbox">
									C
								</div>
							</div>
						))
						: null
					}
				</div>
			</div>
		);
	}

}