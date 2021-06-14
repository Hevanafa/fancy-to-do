import React from "react";
import { ITaskItem } from "../../App";

interface IProps {
	date: Date;
	tasks: Map<string, ITaskItem[]>;
}
export default class TaskList extends React.Component<IProps> {
	isToday = () =>
		this.props.date.getDate() === new Date().getDate();

	render() {
		return (
			<div className="task-list-container">
				<div className="heading">

				</div>
			</div>
		);
	}

}