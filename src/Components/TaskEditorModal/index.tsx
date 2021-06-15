import React from "react";
import { GenericOnClickEvent } from "../../modules/generics";

import "./index.scss";

interface IProps {
	taskEditorTaskName: string;
	taskEditorDateStr: string;

	inputHandler: (e: any) => void;
	cancelButtonHandler: GenericOnClickEvent;
	confirmButtonHandler: GenericOnClickEvent;
}
export default class TaskEditorModal extends React.Component<IProps> {
	render() {
		const {
			taskEditorTaskName,
			taskEditorDateStr,

			inputHandler,
			cancelButtonHandler,
			confirmButtonHandler
		} = this.props;

		return (
			<div className="task-editor-modal">
				<div className="modal-label">
					Task Name
				</div>
				<div className="input-group">
					<input
						type="text"
						name="taskEditorTaskName"
						placeholder="Your task name"
						value={taskEditorTaskName}
						onChange={inputHandler}
					/>
				</div>

				<div className="modal-label">
					Date (dd/mm/yyyy)
				</div>

				<div className="input-group">
					<input
						type="text"
						name="taskEditorDateStr"
						accept="\d{1,2}[-/]\d{1,2}[-/]\d{4}"
						value={taskEditorDateStr}
						onChange={inputHandler}
					/>
				</div>

				<div className="modal-button-group">
					<button
						className="btn-cancel"
						onClick={cancelButtonHandler}>
						X
					</button>
					<button
						className="btn-confirm"
						onClick={confirmButtonHandler}>
						V
					</button>
				</div>
			</div>
		)
	}
}