import React, { Component } from "react";

import BottomMenu, { IBottomMenuProps } from "./Components/BottomMenu";
import AboutUs from "./Components/AboutUs";
import TaskList from "./Components/TaskList";
import CalendarNavigator from "./Components/CalendarNavigator";
import EmptyTaskMessage from "./Components/EmptyTaskMessage";
import AddNewTaskMenu from "./Components/AddNewTaskMenu";
import TaskEditorModal from "./Components/TaskEditorModal";
import Calendar from "./Components/Calendar";
import GoToMonthModal from "./Components/GoToMonthModal";

import {
	DBDateFormatter,
	getDayName,
	getFirstDayOfMonth,
	getMonthName,
	getTodayDate,
	getYearStr,
	validateDateFormat
} from "./modules/commonDate";

import {
	addNewTaskToday,
	addNewTaskTomorrow,
	addNewTaskCustom,
	hideNewTaskMenu
} from "./modules/AddNewTaskMethods";

import {
	loadTaskData,
	saveTaskData
} from "./modules/StorageMethods";

import {
	checkTaskDOM,
	deleteTaskDOM,
	editTaskDOM
} from "./modules/TaskListMethods";

import "./styles/App.scss";

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

	taskEditorItemIdx: number; // only for task editing

	// Calendar
	calendarDate: Date;
	isGoToMonthModalVisible: boolean;
}
class App extends Component<{}, IState> {
	constructor(props: any) {
		super(props);

		// document.addEventListener("deviceready", this.onDeviceReady, false);

		// this.testDateModule();

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

			taskEditorItemIdx: -1,

			// Calendar
			calendarDate: getTodayDate(),
			isGoToMonthModalVisible: false
		};
	}

	// onDeviceReady() {
	// 	const nav = navigator as any;
	// 	alert(nav.notification);
	// }

	testDateModule() {
		const today = new Date();

		console.log(
			"tDM",
			getFirstDayOfMonth(today),
			getDayName(today.getDay()),
			getMonthName(today.getMonth()),
			getYearStr(today.getFullYear())
		);
	}

	componentDidMount() {
		this.loadTaskData();
	}

	// AddNewTaskMethods
	addNewTaskToday = addNewTaskToday;
	addNewTaskTomorrow = addNewTaskTomorrow;
	addNewTaskCustom = addNewTaskCustom;
	hideNewTaskMenu = hideNewTaskMenu;

	// StorageMethods
	loadTaskData = loadTaskData;
	saveTaskData = saveTaskData;

	setDefaultCalendarDate() {
		this.setState({
			calendarDate: getTodayDate()
		});
	}

	setCalendarDateDOM(e: React.MouseEvent) {
		const dateStr = e.currentTarget.getAttribute("date-str");

		if (!dateStr) return;

		this.setState({
			calendarDate: new Date(dateStr)
		});
	}

	showGoToMonthModal() {
		this.setState({
			isGoToMonthModalVisible: true
		});
	}

	hideGoToMonthModal() {
		this.setState({
			isGoToMonthModalVisible: false
		});
	}

	pushNewTask(dateStr: string, taskLabel: string) {
		if (!dateStr || !taskLabel) return;

		const { tasks } = this.state;

		// console.log("pNT", dateStr, taskLabel);

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

		this.setState({ tasks }, () => {
			this.saveTaskData();
		});
	}

	updateTask(dateStr: string, idx: number, taskLabel: string) {
		if (!dateStr || idx < 0 || !taskLabel) return;

		const { tasks } = this.state;

		let taskListRef = tasks.get(dateStr);

		if (!taskListRef) return;

		taskListRef[idx].label = taskLabel;

		this.setState({ tasks }, () => {
			this.saveTaskData();
		});
	}

	// TaskListMethods
	checkTaskDOM = checkTaskDOM;
	editTaskDOM = editTaskDOM;
	deleteTaskDOM = deleteTaskDOM;


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
			taskEditorTaskName,
			taskEditorItemIdx
		} = this.state;

		if (!taskEditorTaskName.trim()) {
			alert("At least put a word to your task.");
			return;
		}

		if (!validateDateFormat(taskEditorDateStr)) {
			alert("Date is not in the correct format.");
			return;
		}

		if (taskEditorItemIdx === -1)
			this.pushNewTask(
				this.getDBDateStr,
				taskEditorTaskName.trim()
			);
		else this.updateTask(
			this.getDBDateStr,
			taskEditorItemIdx,
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
		const { name, value } = e.currentTarget;

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

	activateBottomMenu(itemIdx: number) {
		if (itemIdx === 2) {
			if (this.state.isAboutScreen) {
				alert("You should be either in home, edit mode, or calendar view.");
				return;
			}

			// Todo: immediately create a new task when the user focuses on the calendar

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
			switch (itemIdx) {
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

	// Bottom Menu
	bottomMenuClickDOM(e: React.MouseEvent) {
		const idx = Number(e.currentTarget.getAttribute("idx"));
		this.activateBottomMenu(idx);
	}

	render() {
		const {
			// Screens
			isHome,
			isEditMode,
			isAddNewTaskVisible,
			isAboutScreen,
			isTaskEditorVisible,
			isCalendar,
			isGoToMonthModalVisible,

			// Other states
			calendarDate,
			tasks
		} = this.state;

		const dateStr = DBDateFormatter.format(calendarDate);
		const todayTaskList = tasks.get(dateStr);

		const isCalendarNavigatorVisible = isHome || isEditMode || isCalendar;
		const isTaskListVisible = isHome || isEditMode;

		return (
			<div className="app">
				{
					isAddNewTaskVisible ? (
						<AddNewTaskMenu
							{...this.state}
							addNewTaskToday={this.addNewTaskToday.bind(this)}
							addNewTaskTomorrow={this.addNewTaskTomorrow.bind(this)}
							addNewTaskCustom={this.addNewTaskCustom.bind(this)}
							hideNewTaskMenu={this.hideNewTaskMenu.bind(this)}
						/>
					) : null
				}

				{
					isCalendarNavigatorVisible
						? <CalendarNavigator
							{...this.state}
							setDate={this.setCalendarDateDOM.bind(this)}
							showGoToMonthModal={this.showGoToMonthModal.bind(this)}
						/>
						: null
				}

				{
					isTaskListVisible ? (
						<>
							<TaskList
								{...this.state}

								checkTaskDOM={this.checkTaskDOM.bind(this)}
								editTaskDOM={this.editTaskDOM.bind(this)}
								deleteTaskDOM={this.deleteTaskDOM.bind(this)}
							/>

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
					isCalendar
						? <Calendar
							{...this.state}
							setDate={this.setCalendarDateDOM.bind(this)}
						/>
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

				{
					isGoToMonthModalVisible
						? <GoToMonthModal
							{...this.state}

							cancelButtonHandler={this.hideGoToMonthModal.bind(this)}
							confirmButtonHandler={this.setCalendarDateDOM.bind(this)}
						/>
						: null
				}

				<BottomMenu
					{... this.state}
					menuHandler={this.bottomMenuClickDOM.bind(this)}
				/>
			</div>
		)
	}
}

export default App;
