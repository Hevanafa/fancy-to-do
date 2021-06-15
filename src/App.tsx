import React, { Component } from "react";
import BottomMenu, { IBottomMenuProps } from "./Components/BottomMenu";

import AboutUs from "./Components/AboutUs";
import TaskList from "./Components/TaskList";
import CalendarNavigator from "./Components/CalendarNavigator";
import EmptyTaskMessage from "./Components/EmptyTaskMessage";
import AddNewTaskMenu from "./Components/AddNewTaskMenu";

import {
	DBDateFormatter,
	getTodayDate,
	NormalDateFormatter,
	validateDateFormat
} from "./modules/commonDate";

import "./styles/App.scss";
import { applyMixins } from "./modules/generics";
import { addNewTaskToday, addNewTaskTomorrow, hideNewTaskMenu } from "./modules/AddNewTaskMethods";
import TaskEditorModal from "./Components/TaskEditorModal";
import { parseJSONMap, stringifyMap } from "./modules/commonMap";

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
class App extends Component<{}, IState> {
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

	componentDidMount() {
		this.loadTaskData();
	}

	// AddNewTaskMethods
	addNewTaskToday = addNewTaskToday;
	addNewTaskTomorrow = addNewTaskTomorrow;
	hideNewTaskMenu = hideNewTaskMenu;


	// localStorage operations
	readonly localStorageKey = "task_list";
	loadTaskData() {
		const savedTaskList = localStorage.getItem(this.localStorageKey);

		console.log("lTD sTL", savedTaskList);

		if (!savedTaskList) return;

		const tasks = parseJSONMap(savedTaskList);
		this.setState({ tasks });
	}

	saveTaskData() {
		console.log("sTD tasks", this.state.tasks);
		localStorage.setItem("task_list", stringifyMap(this.state.tasks));
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

	pushNewTask(dateStr: string, taskLabel: string) {
		if (!dateStr || !taskLabel) return;

		const { tasks } = this.state;

		console.log("pNT", dateStr, taskLabel);

		// if ((date as Date).getDate()) {
		// 	const dateStr = DBDateFormatter.format(date);
		// }

		const newTaskItem = {
			label: taskLabel,
			checked: false
		};

		let taskListRef = tasks.get(dateStr);
		if (taskListRef) {
			taskListRef.push(newTaskItem);
			tasks.set(dateStr, taskListRef);
		} else {
			tasks.set(dateStr, [newTaskItem]);
		}

		// console.log("tasks", stringifyMap(tasks));

		this.saveTaskData();

		this.setState({ tasks });

		// Todo: save to localStorage
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

	get getDBDateStr() {
		const { taskEditorDateStr } = this.state;
		return (
			taskEditorDateStr.includes("/")
			? taskEditorDateStr.split("/")
			: taskEditorDateStr.split("-")
		).reverse().join("/");
	}

	// Task Editor
	saveTaskDOM() {
		const {
			taskEditorDateStr,
			taskEditorTaskName
		} = this.state;

		if (!taskEditorTaskName.trim()) {
			alert("At least put a word to your task.");
			return;
		}

		if (!validateDateFormat(taskEditorDateStr)) {
			alert("Date is not in the correct format.");
			return;
		}

		this.pushNewTask(
			this.getDBDateStr,
			taskEditorTaskName.trim()
		);

		this.closeTaskEditor();
	}

	closeTaskEditorDOM() {
		const {
			taskEditorTaskName
		} = this.state;

		if (taskEditorTaskName.length > 0) {
			if (window.confirm("Discard changes?"))
				this.closeTaskEditor();
		} else this.closeTaskEditor();
	}

	closeTaskEditor() {
		this.setState({
			isTaskEditorVisible: false
		});
	}

	handleTaskEditorInput(e: React.FormEvent<HTMLInputElement>) {
		const name = e.currentTarget.name,
			value = e.currentTarget.value;

		// console.log(name + ": " + value);

		switch (name) {
			case "taskEditorTaskName":
				this.setState({
					taskEditorTaskName: value || ""
				});
			break;
			case "taskEditorDateStr":
				this.setState({
					taskEditorDateStr: value || ""
				});
			break;
		}
	}

	// Bottom Menu
	bottomMenuHandler(e: React.MouseEvent) {
		const idx = Number(e.currentTarget.getAttribute("idx"));

		console.log("bMH idx", idx);

		if (idx === 2) {
			// Don't reset the other modes when pressing the "add new task" button
			this.setState({
				isAddNewTaskVisible: !this.state.isAddNewTaskVisible
			});

			return;
		}

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
			// Screens
			isHome,
			isEditMode,
			isAddNewTaskVisible,
			isAboutScreen,
			isTaskEditorVisible,

			// Other states
			calendarDate,
			tasks
		} = this.state;

		const dateStr = DBDateFormatter.format(calendarDate);
		const todayTaskList = tasks.get(dateStr);

		const isTaskListVisible = isHome || isEditMode;

		return (
			<div className="app">
				{
					isAddNewTaskVisible ? (
						<AddNewTaskMenu
							{...this.state}
							addNewTaskToday={this.addNewTaskToday.bind(this)}
							addNewTaskTomorrow={this.addNewTaskTomorrow.bind(this)}
							hideNewTaskMenu={this.hideNewTaskMenu.bind(this)}
						/>
					) : null
				}

				{
					isTaskListVisible ? (
						<>
							<CalendarNavigator
								{...this.state}
								setDate={this.setCalendarNavDate.bind(this)}
							/>

							<TaskList {...this.state} />

							{
								!todayTaskList || !todayTaskList.length
									? <EmptyTaskMessage />
									: null
							}
						</>
					) : null
				}

				{
					isAboutScreen
						? <AboutUs />
						: null
				}

				{
					isTaskEditorVisible
						? <TaskEditorModal
							{...this.state}

							inputHandler={this.handleTaskEditorInput.bind(this)}
							cancelButtonHandler={this.closeTaskEditorDOM.bind(this)}
							confirmButtonHandler={this.saveTaskDOM.bind(this)}
							/>
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

export default App;
