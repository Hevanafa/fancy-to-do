import React, { Component } from "react";
import BottomMenu, { IBottomMenuProps } from "./Components/BottomMenu";

import "./styles/App.scss";
import AboutUs from "./Components/AboutUs";
import TaskList from "./Components/TaskList";
import CalendarNavigator from "./Components/CalendarNavigator";
import { getTodayDate, NormalDateFormatter, validateDateFormat } from "./modules/commonDate";

export interface ITaskItem {
	label: string;
	checked: boolean;
}

interface IState extends IBottomMenuProps {
	lang: string; // "en" is the default

	// key: yyyy-MM-dd
	tasks: Map<string, ITaskItem[]>;

	// Task editor
	isTaskEditorVisible: boolean;
	taskEditorTaskName: string;
	taskEditorDateStr: string;

	// Calendar
	calendarDate: Date;
}
export default class App extends Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			lang: "en",

			isHome: true,
			isEditMode: false,
			isAddNewTaskVisible: false,
			isCalendar: false,
			isAboutScreen: false,

			tasks: new Map(),

			// Task editor
			isTaskEditorVisible: false,
			taskEditorTaskName: "",
			taskEditorDateStr: "",

			// Calendar
			calendarDate: getTodayDate()
		};
	}

	setDefaultCalendarDate() {
		this.setState({
			calendarDate: getTodayDate()
		});
	}

	setCalendarNavDate(e: React.MouseEvent) {
		const dateStr = e.currentTarget.getAttribute("date-str");

		if (!dateStr) return;

		this.setState({
			calendarDate: new Date(dateStr)
		});
	}

	pushNewTask(dateStr: string, label: string) {
		if (!dateStr || !label) return;

		const { tasks } = this.state;

		// if ((date as Date).getDate()) {
		// 	const dateStr = DBDateFormatter.format(date);
		// }

		let taskListRef = tasks.get(dateStr) || [];
		if (!taskListRef)
			tasks.set(dateStr, taskListRef);

		taskListRef.push({
			label: label,
			checked: false
		});

		this.setState({ tasks });
	}

	// Add New Task Menu
	showNewTaskMenu() {
		this.setState({
			isAddNewTaskVisible: true
		});
	}

	hideNewTaskMenu() {
		this.setState({
			isAddNewTaskVisible: true
		});
	}

	addNewTaskToday() {
		this.setState({
			isAddNewTaskVisible: false,
			isTaskEditorVisible: true,

			taskEditorTaskName: "",
			taskEditorDateStr: NormalDateFormatter.format(new Date())
		});
	}

	addNewTaskTomorrow() {
		const today = new Date();
		const date = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 1);

		this.setState({
			isAddNewTaskVisible: false,
			isTaskEditorVisible: true,

			taskEditorTaskName: "",
			taskEditorDateStr: NormalDateFormatter.format(date)
		});
	}

	pickADate() {
		this.setState({
			isCalendar: true,
			isAddNewTaskVisible: false
		});
	}

	// Home Screen
	checkTaskDOM(e: React.MouseEvent) {
		const dateKey = e.currentTarget.getAttribute("date") || "",
			idx = Number(e.currentTarget.getAttribute("idx")) || -1;

		const { tasks } = this.state;

		const taskListRef = tasks.get(dateKey);
		if (!taskListRef) return;

		taskListRef[idx].checked = !taskListRef[idx].checked;

		this.setState({ tasks });
	}

	// Edit Mode
	editTaskDOM(e: React.MouseEvent) {
		const dateKey = e.currentTarget.getAttribute("date") || "",
			idx = Number(e.currentTarget.getAttribute("idx")) || -1;

		const { tasks } = this.state;
		const taskListRef = tasks.get(dateKey);
		if (!taskListRef) return;

		this.setState({
			isTaskEditorVisible: true,
			taskEditorTaskName: taskListRef[idx].label,
			taskEditorDateStr: NormalDateFormatter.format(new Date(dateKey))
		});
	}

	deleteTaskDOM(e: React.MouseEvent) {
		const dateKey = e.currentTarget.getAttribute("date") || "",
			idx = Number(e.currentTarget.getAttribute("idx")) || -1;

		const { tasks } = this.state;
		const taskListRef = tasks.get(dateKey);
		if (!taskListRef) return;

		if (window.confirm(`Delete ${taskListRef[idx].label}?`)) {
			taskListRef.splice(idx, 1);
			this.setState({ tasks });
		}

		this.closeTaskEditor();
	}

	// Todo: save task

	// Task Editor
	saveTaskDOM() {
		const {
			taskEditorTaskName,
			taskEditorDateStr
		} = this.state;

		if (!taskEditorTaskName)
			return;

		if (!validateDateFormat(taskEditorDateStr)) {
			alert("Date is not in the correct format!");
			return;
		}

		this.pushNewTask(
			taskEditorDateStr,
			taskEditorTaskName
		);

		this.closeTaskEditor();
	}

	closeTaskEditor() {
		this.setState({
			isTaskEditorVisible: false
		});
	}

	// Bottom Menu
	bottomMenuHandler(e: React.MouseEvent) {
		const idx = Number(e.currentTarget.getAttribute("idx"));

		console.log("bMH idx", idx);

		if (idx === 2)
			return;

		this.setState({
			isHome: false,
			isEditMode: false,
			isCalendar: false,
			isAboutScreen: false
		}, () => {
			switch (idx) {
				case 0:
					this.setState({
						isEditMode: true
					});
					break;

				case 1:
					this.setState({
						isHome: true
					});
				break;

				case 3:
					this.setState({
						isCalendar: true
					});
				break;

				case 4:
					this.setState({
						isAboutScreen: true
					});
				break;
			}
		});
	}

	render() {
		const {
			isHome,
			isEditMode,

			isAboutScreen,
			tasks
		} = this.state;

		return (
			<div className="app">
				{
					isHome || isEditMode
					? <CalendarNavigator
						selectedDate={this.state.calendarDate}
						setDate={this.setCalendarNavDate.bind(this)}
						/>
					: null
				}

				{
					isHome || isEditMode
					? <TaskList
						date={this.state.calendarDate}
						tasks={tasks} />
					: null
				}

				{
					isAboutScreen
					? <AboutUs />
					: null
				}

				<BottomMenu
					{... this.state}
					menuHandler={this.bottomMenuHandler.bind(this)}
				/>
			</div>
		)
	}
}
