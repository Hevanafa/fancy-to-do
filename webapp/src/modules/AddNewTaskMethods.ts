import { NormalDateFormatter } from "./commonDate";

import App from "../App";

function showNewTaskMenu(this: App) {
	this.setState({
		isAddNewTaskVisible: true
	});
}

function hideNewTaskMenu(this: App) {
	this.setState({
		isAddNewTaskVisible: false
	});
}

function addNewTaskToday(this: App) {
	this.setState({
		isAddNewTaskVisible: false,
		isTaskEditorVisible: true,

		taskEditorTaskName: "",
		taskEditorDateStr: NormalDateFormatter.format(new Date()),
		taskEditorItemIdx: -1
	});
}

function addNewTaskTomorrow(this: App) {
	const today = new Date();
	const date = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 1);

	this.setState({
		isAddNewTaskVisible: false,
		isTaskEditorVisible: true,

		taskEditorTaskName: "",
		taskEditorDateStr: NormalDateFormatter.format(date),
		taskEditorItemIdx: -1
	});
}

function pickADate(this: App) {
	this.setState({
		isCalendar: true,
		isAddNewTaskVisible: false
	});
}

export {
	showNewTaskMenu,
	hideNewTaskMenu,
	addNewTaskToday,
	addNewTaskTomorrow,
	pickADate
}