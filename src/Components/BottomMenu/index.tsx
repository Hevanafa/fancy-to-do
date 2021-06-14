import React from "react";
import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

export interface IBottomMenuProps {
	isHome: boolean;
	isEditMode: boolean;
	isAddNewTaskVisible: boolean;
	isCalendar: boolean;
	isAboutScreen: boolean;
}

interface IProps extends IBottomMenuProps {
	menuHandler: GenericOnClickEvent;
}
export default class BottomMenu extends React.Component<IProps> {
	readonly imgPath = "/assets/img/bottom-menu"

	getClassName = (active: boolean, isPlus = false) =>
		`${active ? "active" : ""} ${isPlus ? "plus" : ""}`;

	render() {
		const {
			isHome,
			isEditMode,
			isAddNewTaskVisible,
			isCalendar,
			isAboutScreen: isInfo,

			menuHandler
		} = this.props;

		return (
			<div className="bottom-menu">
				<button
					className={this.getClassName(isEditMode)}
					{...{ idx: 0 }}
					onClick={menuHandler}>
					<img src={`${this.imgPath}/pencil.png`} alt="pencil" />
				</button>

				<button 
					className={this.getClassName(isHome)}
					{...{ idx: 1 }}
					onClick={menuHandler}>
					<img src={`${this.imgPath}/home.png`} alt="home" />
				</button>
				
				<button
					className={this.getClassName(isAddNewTaskVisible, true)}
					{...{ idx: 2 }}
					onClick={menuHandler}>
					<img src={`${this.imgPath}/plus.png`} alt="plus" />
				</button>
				
				<button
					className={this.getClassName(isCalendar)}
					{...{ idx: 3 }}
					onClick={menuHandler}>
					<img src={`${this.imgPath}/calendar.png`} alt="calendar" />
				</button>
				
				<button
					className={this.getClassName(isInfo)}
					{...{ idx: 4 }}
					onClick={menuHandler}>
					<img src={`${this.imgPath}/info.png`} alt="info" />
				</button>
			</div>
		);
	}
}