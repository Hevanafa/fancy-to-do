import React from "react";
import { hideNewTaskMenu } from "../../modules/AddNewTaskMethods";
import { GenericOnClickEvent, getImgSrc } from "../../modules/generics";

import "./index.scss";

interface IState {
	hasVisibilityClass: boolean;
}

interface IProps {
	addNewTaskToday: GenericOnClickEvent;
	addNewTaskTomorrow: GenericOnClickEvent;
	addNewTaskCustom: GenericOnClickEvent;
	
	hideNewTaskMenu: GenericOnClickEvent;
}
export default class AddNewTaskMenu extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.hide = this.hide.bind(this);
	}

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
			addNewTaskTomorrow,
			addNewTaskCustom
		} = this.props;

		return (
			<>
				<div
					className="invisible-overlay"
					onClick={this.hide}></div>

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

					<div className="menu-item"
						onClick={addNewTaskCustom}>
						<div className="grey"></div>
						<div>
							Pick a date
						</div>
					</div>

					<img
						className="triangle"
						src={getImgSrc("/new-task-menu/triangle.png")}
						alt="triangle"
					/>
				</div>
			</>
		);
	}
}