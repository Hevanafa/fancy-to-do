import App from "../App";
import { parseJSONMap, stringifyMap } from "./commonMap";

const localStorageKey = "task_list";

function loadTaskData(this: App) {
	const savedTaskList = localStorage.getItem(localStorageKey);

	// console.log("lTD sTL", savedTaskList);

	if (!savedTaskList) return;

	const tasks = parseJSONMap(savedTaskList);
	this.setState({ tasks });
}

function saveTaskData(this: App) {
	// console.log("sTD tasks", this.state.tasks);
	localStorage.setItem(
		localStorageKey,
		stringifyMap(this.state.tasks)
	);
}

export {
	loadTaskData,
	saveTaskData
}