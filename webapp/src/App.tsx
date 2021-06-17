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
import { activateBottomMenu, bottomMenuClickDOM } from "./modules/BottomMenuMethods";

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

		this.bindCommonFunctions();
	}

	// onDeviceReady() {
	// 	const nav = navigator as any;
	// 	alert(nav.notification);
	// }

	bindCommonFunctions() {
		this.addNewTaskToday = this.addNewTaskToday.bind(this)
		this.addNewTaskTomorrow = this.addNewTaskTomorrow.bind(this);
		this.addNewTaskCustom = this.addNewTaskCustom.bind(this);
		this.hideNewTaskMenu = this.hideNewTaskMenu.bind(this);
		this.setCalendarDateDOM = this.setCalendarDateDOM.bind(this);
		this.showGoToMonthModal = this.showGoToMonthModal.bind(this);
		this.checkTaskDOM = this.checkTaskDOM.bind(this);
		this.editTaskDOM = this.editTaskDOM.bind(this);
		this.deleteTaskDOM = this.deleteTaskDOM.bind(this);

		this.handleTaskEditorInput = this.handleTaskEditorInput.bind(this);
		this.closeTaskEditorDOM = this.closeTaskEditorDOM.bind(this);
		this.saveTaskDOM = this.saveTaskDOM.bind(this);
		this.hideGoToMonthModal = this.hideGoToMonthModal.bind(this);
		this.bottomMenuClickDOM = this.bottomMenuClickDOM.bind(this);
	}

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

	// BottomMenuMethods
	activateBottomMenu = activateBottomMenu;
	bottomMenuClickDOM = bottomMenuClickDOM;

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

		const dateStr = DBDateFormatter.format(calendarDate),
			todayTaskList = tasks.get(dateStr),

			isCalendarNavigatorVisible = isHome || isEditMode || isCalendar,
			isTaskListVisible = isHome || isEditMode;

		return (
			<div className="app">
				{
					isAddNewTaskVisible ? (
						<AddNewTaskMenu
							{...this.state}
							addNewTaskToday={this.addNewTaskToday}
							addNewTaskTomorrow={this.addNewTaskTomorrow}
							addNewTaskCustom={this.addNewTaskCustom}
							hideNewTaskMenu={this.hideNewTaskMenu}
						/>
					) : null
				}

				{
					isCalendarNavigatorVisible
						? <CalendarNavigator
							{...this.state}
							setDate={this.setCalendarDateDOM}
							showGoToMonthModal={this.showGoToMonthModal}
						/>
						: null
				}

				{
					isTaskListVisible ? (
						<>
							<TaskList
								{...this.state}

								checkTaskDOM={this.checkTaskDOM}
								editTaskDOM={this.editTaskDOM}
								deleteTaskDOM={this.deleteTaskDOM}
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
							setDate={this.setCalendarDateDOM}
						/>
						: null
				}

				{
					isTaskEditorVisible
						? <TaskEditorModal
							{...this.state}

							inputHandler={this.handleTaskEditorInput}
							cancelButtonHandler={this.closeTaskEditorDOM}
							confirmButtonHandler={this.saveTaskDOM}
						/>
						: null
				}

				{
					isGoToMonthModalVisible
						? <GoToMonthModal
							{...this.state}

							cancelButtonHandler={this.hideGoToMonthModal}
							confirmButtonHandler={this.setCalendarDateDOM}
						/>
						: null
				}

				<BottomMenu
					{... this.state}
					menuHandler={this.bottomMenuClickDOM}
				/>
			</div>
		)
	}
}

export default App;
