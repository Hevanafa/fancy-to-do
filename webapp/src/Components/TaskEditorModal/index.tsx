import React from "react";
import { GenericOnClickEvent, getImgSrc } from "../../modules/generics";

import "../../styles/modals.scss";

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
			<>
				<div className="blur-overlay"></div>

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
							className="btn-transparent btn-cancel"
							onClick={cancelButtonHandler}>
							<img
								src={getImgSrc("/task-editor/btn-cancel.png")}
								alt="cancel"
							/>
						</button>
						<button
							className="btn-transparent btn-confirm"
							onClick={confirmButtonHandler}>
							<img
								src={getImgSrc("/task-editor/btn-confirm.png")}
								alt="cancel"
							/>
						</button>
					</div>
				</div>
			</>
		);
	}
}