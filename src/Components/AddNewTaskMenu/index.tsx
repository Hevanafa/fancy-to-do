import React from "react";
import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

interface IProps {
	addNewTaskToday: GenericOnClickEvent;
	addNewTaskTomorrow: GenericOnClickEvent;
	hideNewTaskMenu: GenericOnClickEvent;
}
export default class AddNewTaskMenu extends React.Component<IProps> {
	render() {
		const {
			addNewTaskToday,
			addNewTaskTomorrow,
			hideNewTaskMenu
		} = this.props;

		return (
			<>
				<div
					className="invisible-overlay"
					onClick={hideNewTaskMenu}></div>

				<div className="add-new-task-menu">
					<div className="heading">
						Add New Task
					</div>

					<div className="menu-item"
						onClick={addNewTaskToday}>
						<div className="blue"></div>
						<div>
							Today
						</div>
					</div>

					<div className="menu-item"
						onClick={addNewTaskTomorrow}>
						<div className="yellow"></div>
						<div>
							Tomorrow
						</div>
					</div>

					<div className="menu-item">
						<div className="grey"></div>
						<div>
							Pick a date
						</div>
					</div>

					<img
						className="triangle"
						src="/assets/img/new-task-menu/triangle.png"
						alt="triangle"
					/>
				</div>
			</>
		);
	}
}