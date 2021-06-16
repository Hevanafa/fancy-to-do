import App from "../App";
import { DBDateFormatter, NormalDateFormatter } from "./commonDate";

// Home Screen
function checkTaskDOM(this: App, e: React.MouseEvent) {
	// const dateKey = e.currentTarget.getAttribute("date") || "",
	const idx = Number(e.currentTarget.getAttribute("idx"));

	const {
		calendarDate,
		tasks
	} = this.state;

	const dateKey = DBDateFormatter.format(calendarDate);
	const taskListRef = tasks.get(dateKey);

	if (!taskListRef) return;

	taskListRef[idx].checked = !taskListRef[idx].checked;

	this.setState({ tasks }, () => {
		this.saveTaskData();
	});
}

// Edit Mode
function editTaskDOM(this: App, e: React.MouseEvent) {
	const idx = Number(e.currentTarget.getAttribute("idx"));

	const {
		calendarDate,
		tasks
	} = this.state;

	const dateKey = DBDateFormatter.format(calendarDate);
	const taskListRef = tasks.get(dateKey);

	if (!taskListRef) return;

	this.setState({
		isTaskEditorVisible: true,
		taskEditorTaskName: taskListRef[idx].label,
		taskEditorDateStr: NormalDateFormatter.format(calendarDate),
		taskEditorItemIdx: idx
	});
}

function deleteTaskDOM(this: App, e: React.MouseEvent) {
	// const dateKey = e.currentTarget.getAttribute("date") || "",
	const idx = Number(e.currentTarget.getAttribute("idx"));

	const {
		calendarDate,
		tasks
	} = this.state;

	const dateKey = DBDateFormatter.format(calendarDate);
	const taskListRef = tasks.get(dateKey);

	if (!taskListRef) return;

	if (window.confirm(`Delete ${taskListRef[idx].label}?`)) {
		taskListRef.splice(idx, 1);
		this.setState({ tasks }, () => {
			this.saveTaskData();
		});
	}

	this.closeTaskEditor();
}

export {
	checkTaskDOM,
	editTaskDOM,
	deleteTaskDOM
}