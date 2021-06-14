import React from "react";
import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

interface IState {
	hasVisibilityClass: boolean;
}

interface IProps {
	addNewTaskToday: GenericOnClickEvent;
	addNewTaskTomorrow: GenericOnClickEvent;
	hideNewTaskMenu: GenericOnClickEvent;
}
export default class AddNewTaskMenu extends React.Component<IProps, IState> {
	state = {
		hasVisibilityClass: false
	}

	componentDidMount() {
		window.setTimeout(() => {
			this.setState({
				hasVisibilityClass: true
			});
		}, 100);
	}

	hide(e: React.MouseEvent) {
		this.setState({
			hasVisibilityClass: false
		}, () => {
			window.setTimeout(() => {
				this.props.hideNewTaskMenu(e);
			}, 300);
		});
	}

	getClassList = () =>
		`add-new-task-menu ${this.state.hasVisibilityClass ? "visible" : ""}`

	render() {
		const {
			addNewTaskToday,
			addNewTaskTomorrow
		} = this.props;

		return (
			<>
				<div
					className="invisible-overlay"
					onClick={this.hide.bind(this)}></div>

				<div className={this.getClassList()}>
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